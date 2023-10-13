package com.winners.server.config.success.handler

import com.winners.server.config.service.CustomUserDetailsService
import com.winners.server.config.service.JwtService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler

class GoogleOAuthAuthenticationSuccessHandler(
    private val authenticationManager: AuthenticationManager,
    private val customUserDetailsService: CustomUserDetailsService,
    private val jwtService: JwtService,
): AuthenticationSuccessHandler {
    override fun onAuthenticationSuccess(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        authentication: Authentication?,
    ) {
        try {
            authenticationManager.authenticate(authentication)
        } catch (e: Exception) {
            throw BadCredentialsException("User not found with email: ${authentication?.name}")
        }

        val userDetails = customUserDetailsService.loadUserByUsername(authentication?.name!!)
        val token = jwtService.generateToken(userDetails)

        if (response != null) {
            val cookie = Cookie("jwtToken", token).apply {
                maxAge = 3600
                path = "/"
                domain = "localhost"
            }
            response.addCookie(cookie)
            response.sendRedirect("http://localhost:5000/authenticate")
        }
    }
}