package com.winners.server.impl.domain.service

import com.winners.server.domain.service.FastApiService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class FastApiServiceImpl(
    private val restTemplate: RestTemplate
): FastApiService {
    override fun fetchStockData(ticker: String): ResponseEntity<String> {
        val url = "http://localhost:2000/stock/$ticker"
        val responseType = String::class.java
        return restTemplate.getForEntity(url, responseType)
    }
}