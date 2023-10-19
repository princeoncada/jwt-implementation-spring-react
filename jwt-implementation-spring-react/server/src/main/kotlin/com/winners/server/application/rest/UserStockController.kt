package com.winners.server.application.rest

import com.winners.server.application.dto.UserStockDTOs
import com.winners.server.domain.model.Stock
import com.winners.server.domain.service.UserStockService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user/stock")
class UserStockController(
    private val userStockService: UserStockService
) {
    @GetMapping
    fun getStocksByUser(): ResponseEntity<List<Stock>> {
        return try {
            val stocks = mutableListOf<Stock>()
            val authentication: Authentication = SecurityContextHolder.getContext().authentication
            val userStocks = userStockService.getStocksByUser(authentication.name)
            userStocks.forEach {
                stocks.add(it.stock)
            }
            ResponseEntity.ok(stocks)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }

    @PostMapping
    fun addStockToUser(
        @RequestBody requestEntity: UserStockDTOs.PostRequest
    ): ResponseEntity<UserStockDTOs.GetResult> {
        return try {
            val authentication: Authentication = SecurityContextHolder.getContext().authentication
            val userStock = userStockService.addStockToUser(authentication.name, requestEntity)
            ResponseEntity.ok(userStock)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }

    @DeleteMapping("/{ticker}")
    fun deleteStockFromUser(
        @PathVariable ticker: String
    ): ResponseEntity<List<UserStockDTOs.GetResult>> {
        return try {
            val authentication: Authentication = SecurityContextHolder.getContext().authentication
            val userStocks = userStockService.deleteStockFromUser(authentication.name, ticker)
            ResponseEntity.ok(userStocks)
        } catch (e: Exception) {
            ResponseEntity.badRequest().build()
        }
    }
}