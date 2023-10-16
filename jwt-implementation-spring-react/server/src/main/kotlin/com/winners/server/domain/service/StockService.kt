package com.winners.server.domain.service

import com.winners.server.domain.model.Stock
import org.springframework.stereotype.Service
import java.util.*

@Service
interface StockService {
    fun getStockByTicker(ticker: String): Stock
    fun isExpired(stock: Stock): Boolean
}