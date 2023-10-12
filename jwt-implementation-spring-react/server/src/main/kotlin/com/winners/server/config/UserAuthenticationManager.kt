package com.winners.server.config

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.Authentication

class UserAuthenticationManager: AuthenticationManager {
    override fun authenticate(authentication: Authentication?): Authentication {
        TODO("Not yet implemented")
    }
}