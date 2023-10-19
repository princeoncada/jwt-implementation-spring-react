package com.winners.server.impl.domain.service

import com.winners.server.application.dto.UserStockDTOs
import com.winners.server.application.mapper.UserStockMapper
import com.winners.server.domain.model.UserStock
import com.winners.server.domain.repository.UserStockRepository
import com.winners.server.domain.service.UserStockService
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserStockServiceImpl(
    private val userStockRepository: UserStockRepository,
    private val userStockMapper: UserStockMapper
): UserStockService {
    override fun getStocksByUser(
        email: String
    ): List<UserStock> {
        return userStockRepository.findByUserEmail(email)
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