package com.winners.server.domain.service

import com.winners.server.application.dto.StockDTOs
import com.winners.server.application.dto.UserStockDTOs
import com.winners.server.domain.model.UserStock
import org.springframework.stereotype.Service

@Service
interface UserStockService {
    fun getStocksByUser(email: String): List<StockDTOs.GetResult>
    fun addStockToUser(email: String, entityRequest: UserStockDTOs.PostRequest): UserStockDTOs.GetResult
    fun deleteStockFromUser(email: String, ticker: String): List<UserStockDTOs.GetResult>
    fun hasStock(email: String, ticker: String): Boolean
}