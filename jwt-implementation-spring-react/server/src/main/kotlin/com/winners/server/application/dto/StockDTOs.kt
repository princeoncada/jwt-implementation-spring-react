package com.winners.server.application.dto

class StockDTOs {
    data class GetResult(
        val id: String,
        val ticker: String,
        val stockData: String,
        val growth: Int,
        val dividend: Int,
        val value: Int,
        val total: Int,
        val expiry: String
    )

    data class PutRequest(
        val stockData: String,
        val growth: Int,
        val dividend: Int,
        val value: Int,
        val total: Int,
        val expiry: String
    )

    data class PostRequest(
        val ticker: String,
        val stockData: String,
        val growth: Int,
        val dividend: Int,
        val value: Int,
        val total: Int,
        val expiry: String
    )
}