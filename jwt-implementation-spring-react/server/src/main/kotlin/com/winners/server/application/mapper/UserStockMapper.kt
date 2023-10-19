package com.winners.server.application.mapper

import com.winners.server.application.dto.UserStockDTOs
import com.winners.server.domain.model.UserStock
import com.winners.server.domain.repository.StockRepository
import com.winners.server.domain.repository.UserRepository
import org.springframework.stereotype.Component

@Component
class UserStockMapper(
    private val userRepository: UserRepository,
    private val stockRepository: StockRepository,
) {
    fun toGetResult(
        entity: UserStock
    ): UserStockDTOs.GetResult {
        return UserStockDTOs.GetResult(
            id = entity.id,
            email = entity.user.email,
            ticker = entity.stock.ticker,
        )
    }

    fun createEntity(
        id: String,
        email: String,
        entityRequest: UserStockDTOs.PostRequest
    ): UserStock {
        return UserStock(
            id = id,
            ticker = entityRequest.ticker,
            user = userRepository.findByEmail(email).get(),
            stock = stockRepository.findByTicker(entityRequest.ticker).get(),
        )
    }
}