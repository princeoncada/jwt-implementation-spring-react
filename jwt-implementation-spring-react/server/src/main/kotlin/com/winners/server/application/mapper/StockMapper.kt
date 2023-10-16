package com.winners.server.application.mapper

import com.winners.server.application.dto.StockDTOs
import com.winners.server.application.mapper.base.EntityMapper
import com.winners.server.domain.model.Stock
import org.springframework.stereotype.Component
import java.time.Instant
import java.time.LocalDateTime

@Component
class StockMapper: EntityMapper<Stock, StockDTOs.GetResult, StockDTOs.PostRequest, StockDTOs.PutRequest> {
    override fun toGetResult(
        entity: Stock
    ): StockDTOs.GetResult {
        return StockDTOs.GetResult(
            id = entity.id,
            ticker = entity.ticker,
            stockData = entity.stockData,
            growth = entity.growth,
            dividend = entity.dividend,
            value = entity.value,
            total = entity.total,
            expiry = entity.expiry.toString()
        )
    }

    override fun createEntity(
        id: String,
        entityRequest: StockDTOs.PostRequest
    ): Stock {
        return Stock(
            id = id,
            ticker = entityRequest.ticker,
            stockData = entityRequest.stockData,
            growth = entityRequest.growth,
            dividend = entityRequest.dividend,
            value = entityRequest.value,
            total = entityRequest.total,
            expiry = LocalDateTime.parse(entityRequest.expiry),
            createdAt = Instant.now(),
            updatedAt = Instant.now()
        )
    }

    override fun updateEntity(
        entity: Stock,
        entityRequest: StockDTOs.PutRequest
    ): Stock {
        return Stock(
            id = entity.id,
            ticker = entity.ticker,
            stockData = entityRequest.stockData,
            growth = entityRequest.growth,
            dividend = entityRequest.dividend,
            value = entityRequest.value,
            total = entityRequest.total,
            expiry = LocalDateTime.parse(entityRequest.expiry),
            createdAt = entity.createdAt,
            updatedAt = Instant.now()
        )
    }
}