package com.winners.server.application.rest

import com.winners.server.application.dto.StockDTOs
import com.winners.server.domain.model.Stock
import com.winners.server.domain.service.StockService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/stock")
class StockController(
    private val stockService: StockService
) {
    @GetMapping("/{ticker}")
    fun getStock(
        @PathVariable ticker: String
    ): ResponseEntity<Stock> {
        return try {
            val stock = stockService.getStockByTicker(ticker)
            ResponseEntity.ok(stock)
        } catch (e: Exception) {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/top")
    fun getTopStocks(): ResponseEntity<List<StockDTOs.GetResult>> {
        return try {
            val stocks = stockService.getTopStocks()
            ResponseEntity.ok(stocks)
        } catch (e: Exception) {
            ResponseEntity.notFound().build()
        }
    }
}