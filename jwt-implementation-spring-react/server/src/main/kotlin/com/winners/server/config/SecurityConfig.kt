package com.winners.server.config

import com.winners.server.config.service.CustomOidcUserService
import com.winners.server.config.service.CustomUserDetailsService
import com.winners.server.config.service.JwtService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService
import org.springframework.security.web.SecurityFilterChain
@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtService: JwtService,
    private val customUserDetailsService: CustomUserDetailsService
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            csrf { disable() }
            //TODO("Enable CORS")
            authorizeHttpRequests {
                authorize(anyRequest, permitAll)
            }
            oauth2Login {
                userInfoEndpoint {
                    oidcUserService = oidcUserService()
                }
                //TODO("defaultSuccessUrl")
            }
            //TODO("Add JWT authentication filter")
        }

        return http.build()
    }

    //TODO("Add CORS filter")

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun oidcUserService(): OidcUserService {
        return CustomOidcUserService(OidcUserService())
    }
}