package com.winners.server.domain.repository

import com.winners.server.domain.model.Stock
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StockRepository: JpaRepository<Stock, String> {
    fun findByTicker(ticker: String): Optional<Stock>
}
