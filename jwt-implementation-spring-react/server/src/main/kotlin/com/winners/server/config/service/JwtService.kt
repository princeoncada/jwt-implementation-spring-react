package com.winners.server.config.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import org.springframework.stereotype.Service
import java.util.*
import javax.crypto.SecretKey

@Service
class JwtService(
    private val secretKey: SecretKey,
) {
    fun generateToken(principal: CustomUserDetails): String {
        val now = Date()
        val validity = Date(now.time + ACCESS_TOKEN_VALIDITY)
        return Jwts.builder()
            .setIssuer("https://localhost:8000/authenticate")
            .setSubject(principal.username)
            .setAudience("authenticate-api")
            .setId(principal.getUserId())
            .setExpiration(validity)
            .setIssuedAt(now)
            .claim("authorities", principal.authorities.map { it.authority })
            .signWith(secretKey)
            .compact()
    }

    fun getClaims(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .body
    }

    fun isTokenExpired(token: String): Boolean {
        return getClaims(token).expiration.before(Date())
    }

    fun isTokenValid(token: String, userDetails: CustomUserDetails): Boolean {
        return getClaims(token).subject == userDetails.username && !isTokenExpired(token)
    }

    companion object {
        private const val ACCESS_TOKEN_VALIDITY = 3600000L // Token validity: 1 hour
    }
}