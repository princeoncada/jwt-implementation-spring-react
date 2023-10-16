package com.winners.server.domain.repository

import com.winners.server.domain.model.Stock
import com.winners.server.domain.model.StockStatistics
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StockStatisticsRepository: JpaRepository<StockStatistics, String> {
    fun findByTicker(ticker: String): Optional<StockStatistics>
}
