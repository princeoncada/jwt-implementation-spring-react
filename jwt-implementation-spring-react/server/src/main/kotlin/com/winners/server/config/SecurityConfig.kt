package com.winners.server.config

import com.winners.server.config.authentication.filter.JwtAuthenticationFilter
import com.winners.server.config.authentication.provider.GoogleOAuthAuthenticationProvider
import com.winners.server.config.service.*
import com.winners.server.config.success.handler.GoogleOAuthAuthenticationSuccessHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtService: JwtService,
    private val customUserDetailsService: CustomUserDetailsService,
    private val googleOAuthAuthenticationProvider: GoogleOAuthAuthenticationProvider
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            csrf { disable() }
            cors {  }
            authorizeHttpRequests {
//                authorize(anyRequest, authenticated)
                authorize(anyRequest, permitAll)
            }
            oauth2Login {
                userInfoEndpoint {
                    oidcUserService = oidcUserService()
                }
                authenticationSuccessHandler = googleOAuthAuthenticationSuccessHandler()
            }
            sessionManagement {
                sessionCreationPolicy = SessionCreationPolicy.STATELESS
            }
            addFilterBefore<UsernamePasswordAuthenticationFilter>(
                JwtAuthenticationFilter(
                    jwtService,
                    customUserDetailsService
                )
            )
        }
        return http.build()
    }

    @Bean
    fun corsFilter(): CorsFilter {
        val source = UrlBasedCorsConfigurationSource()
        val config = CorsConfiguration().applyPermitDefaultValues()
        config.allowedOrigins = listOf("*")
        config.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        config.allowedHeaders = listOf("content-type", "authorization", "X-Access-Token")
        source.registerCorsConfiguration("/**", config)
        return CorsFilter(source)
    }

    @Bean
    fun googleOAuthAuthenticationSuccessHandler(): GoogleOAuthAuthenticationSuccessHandler {
        return GoogleOAuthAuthenticationSuccessHandler(
            googleOAuthAuthenticationManager(googleOAuthAuthenticationProvider),
            customUserDetailsService,
            jwtService
        )
    }

    @Bean
    fun googleOAuthAuthenticationManager(googleOAuthAuthenticationProvider: GoogleOAuthAuthenticationProvider): AuthenticationManager {
        return ProviderManager(listOf(googleOAuthAuthenticationProvider))
    }

    @Bean
    fun oidcUserService(): OidcUserService {
        return GoogleOidcUserService(OidcUserService())
    }
}