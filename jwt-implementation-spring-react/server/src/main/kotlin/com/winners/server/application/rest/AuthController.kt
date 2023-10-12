package com.winners.server.application.rest

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController{
    @GetMapping("/hello")
    fun hello() {
        println("Hello World!")
    }

    @PostMapping("/authenticate")
    fun createAuthenticationToken(): ResponseEntity<String> {
        AuthenticationManager().authenticate()
        println("Login")
    }
}