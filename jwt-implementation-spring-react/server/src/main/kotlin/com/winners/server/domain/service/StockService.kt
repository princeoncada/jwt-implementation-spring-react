package com.winners.server.domain.service

import com.winners.server.application.dto.StockDTOs
import com.winners.server.domain.model.Stock
import org.springframework.stereotype.Service

@Service
interface StockService {
    fun getStockByTicker(ticker: String): Stock
    fun getTopStocks(): List<StockDTOs.GetResult>
    fun isExpired(stock: Stock): Boolean
    fun getMinMaxValues(): MutableMap<String, DoubleArray>
}