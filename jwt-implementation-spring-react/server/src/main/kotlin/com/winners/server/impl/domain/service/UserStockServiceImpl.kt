package com.winners.server.impl.domain.service

import com.winners.server.application.dto.StockDTOs
import com.winners.server.application.dto.UserStockDTOs
import com.winners.server.application.mapper.StockMapper
import com.winners.server.application.mapper.UserStockMapper
import com.winners.server.domain.model.Stock
import com.winners.server.domain.model.UserStock
import com.winners.server.domain.repository.UserStockRepository
import com.winners.server.domain.service.UserStockService
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserStockServiceImpl(
    private val userStockRepository: UserStockRepository,
    private val userStockMapper: UserStockMapper,
    private val stockMapper: StockMapper
): UserStockService {
    override fun getStocksByUser(
        email: String
    ): List<StockDTOs.GetResult> {
        val stocks = mutableListOf<Stock>()
        val userStocks = userStockRepository.findByUserEmail(email)
        userStocks.forEach {
            stocks.add(it.stock)
        }
        return stocks.map { stockMapper.toGetResult(it) }
    }
    override fun addStockToUser(
        email: String,
        entityRequest: UserStockDTOs.PostRequest
    ): UserStockDTOs.GetResult {
        val userStockId = UUID.randomUUID().toString()
        val savedUserStock = userStockRepository.save(userStockMapper.createEntity(userStockId, email, entityRequest))
        return userStockMapper.toGetResult(savedUserStock)
    }

    override fun deleteStockFromUser(
        email: String,
        ticker: String
    ): List<UserStockDTOs.GetResult> {
        val currentUserStock = userStockRepository.findByUserEmailAndStockTicker(email, ticker).get()
        userStockRepository.delete(currentUserStock)
        return userStockRepository.findByUserEmail(email).map { userStockMapper.toGetResult(it) }
    }

    override fun hasStock(
        email: String,
        ticker: String
    ): Boolean {
        return userStockRepository.existsByUserEmailAndStockTicker(email, ticker)
    }
}