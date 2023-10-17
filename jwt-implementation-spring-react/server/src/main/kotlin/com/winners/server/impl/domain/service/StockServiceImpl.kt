package com.winners.server.impl.domain.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.winners.server.application.dto.StockDTOs
import com.winners.server.application.mapper.StockMapper
import com.winners.server.domain.model.Stock
import com.winners.server.domain.model.StockStatistics
import com.winners.server.domain.repository.StockRepository
import com.winners.server.domain.repository.StockStatisticsRepository
import com.winners.server.domain.service.FastApiService
import com.winners.server.domain.service.StockService
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDateTime
import java.util.*

@Service
class StockServiceImpl(
    private val fastApiService: FastApiService,
    private val stockRepository: StockRepository,
    private val stockStatisticsRepository: StockStatisticsRepository,
    private val stockMapper: StockMapper,
    private val objectMapper: ObjectMapper
): StockService {
    override fun getStockByTicker(ticker: String): Stock {
        val stock = stockRepository.findByTicker(ticker)
        if (stock.isPresent) {
            if (!isExpired(stock.get())){
                return stock.get()
            } else {
                try {
                    val stockStatistics = stockStatisticsRepository.findByTicker(ticker).get()
                    val stockData = fastApiService.fetchStockData(ticker).body!!
                    val stockJsonNode = objectMapper.readTree(stockData)

                    val newStock = stockMapper.createEntity(
                        id = stock.get().id,
                        entityRequest = StockDTOs.PostRequest(
                            ticker = stock.get().ticker,
                            name = stock.get().name,
                            stockData = stockData,
                            price = stockJsonNode["details"]["Price"].asDouble(),
                            growth = stockJsonNode["score"]["growth"].asInt(),
                            dividend = stockJsonNode["score"]["dividend"].asInt(),
                            value = stockJsonNode["score"]["value"].asInt(),
                            total = stockJsonNode["score"]["total"].asInt(),
                            expiry = LocalDateTime.now().plusDays(7).toString()
                        )
                    )

                    val newStockStatistics = StockStatistics(
                        id = stockStatistics.id,
                        ticker = stockStatistics.ticker,
                        stock = newStock,
                        trailingPe = stockJsonNode["statistics"]["Trailing P/E"].asDouble(),
                        priceSales = stockJsonNode["statistics"]["Price/Sales"].asDouble(),
                        priceBook = stockJsonNode["statistics"]["Price/Book"].asDouble(),
                        enterpriseValueEbitda = stockJsonNode["statistics"]["Enterprise Value/EBITDA"].asDouble(),
                        returnOnEquity = stockJsonNode["statistics"]["Return on Equity"].asDouble(),
                        quarterlyRevenueGrowth = stockJsonNode["statistics"]["Quarterly Revenue Growth"].asDouble(),
                        quarterlyEarningsGrowth = stockJsonNode["statistics"]["Quarterly Earnings Growth"].asDouble(),
                        totalDebtEquity = stockJsonNode["statistics"]["Total Debt/Equity"].asDouble(),
                        forwardAnnualDividendYield = stockJsonNode["statistics"]["Forward Annual Dividend Yield"].asDouble(),
                        trailingAnnualDividendYield = stockJsonNode["statistics"]["Trailing Annual Dividend Yield"].asDouble(),
                        payoutRatio = stockJsonNode["statistics"]["Payout Ratio"].asDouble(),
                        interestCoverageRatio = stockJsonNode["statistics"]["Interest Coverage Ratio"].asDouble(),
                        operatingCashFlowNetIncomeRatio = stockJsonNode["statistics"]["Operating Cash Flow / Net Income Ratio"].asDouble(),
                        freeCashFlowConversion = stockJsonNode["statistics"]["Free Cash Flow Conversion"].asDouble(),
                        debtCoverageRatio = stockJsonNode["statistics"]["Debt Coverage Ratio"].asDouble(),
                        createdAt = stockStatistics.createdAt,
                        updatedAt = Instant.now()
                    )

                    val savedStock = stockRepository.save(newStock)
                    stockStatisticsRepository.save(newStockStatistics)
                    return savedStock
                } catch (e: Exception) {
                    throw Exception("Error occurred during process stock is expired / Error: ${e.message}")
                }

            }
        } else {
            try {
                val stockData = fastApiService.fetchStockData(ticker).body!!
                val stockJsonNode = objectMapper.readTree(stockData)

                val newStock = stockMapper.createEntity(
                    id = UUID.randomUUID().toString(),
                    entityRequest = StockDTOs.PostRequest(
                        ticker = ticker,
                        name = stockJsonNode["details"]["Name"].asText(),
                        stockData = stockData,
                        price = stockJsonNode["details"]["Price"].asDouble(),
                        growth = stockJsonNode["score"]["growth"].asInt(),
                        dividend = stockJsonNode["score"]["dividend"].asInt(),
                        value = stockJsonNode["score"]["value"].asInt(),
                        total = stockJsonNode["score"]["total"].asInt(),
                        expiry = LocalDateTime.now().plusDays(7).toString()
                    )
                )

                val newStockStatistics = StockStatistics(
                    id = UUID.randomUUID().toString(),
                    ticker = ticker,
                    stock = newStock,
                    trailingPe = stockJsonNode["statistics"]["Trailing P/E"].asDouble(),
                    priceSales = stockJsonNode["statistics"]["Price/Sales"].asDouble(),
                    priceBook = stockJsonNode["statistics"]["Price/Book"].asDouble(),
                    enterpriseValueEbitda = stockJsonNode["statistics"]["Enterprise Value/EBITDA"].asDouble(),
                    returnOnEquity = stockJsonNode["statistics"]["Return on Equity"].asDouble(),
                    quarterlyRevenueGrowth = stockJsonNode["statistics"]["Quarterly Revenue Growth"].asDouble(),
                    quarterlyEarningsGrowth = stockJsonNode["statistics"]["Quarterly Earnings Growth"].asDouble(),
                    totalDebtEquity = stockJsonNode["statistics"]["Total Debt/Equity"].asDouble(),
                    forwardAnnualDividendYield = stockJsonNode["statistics"]["Forward Annual Dividend Yield"].asDouble(),
                    trailingAnnualDividendYield = stockJsonNode["statistics"]["Trailing Annual Dividend Yield"].asDouble(),
                    payoutRatio = stockJsonNode["statistics"]["Payout Ratio"].asDouble(),
                    interestCoverageRatio = stockJsonNode["statistics"]["Interest Coverage Ratio"].asDouble(),
                    operatingCashFlowNetIncomeRatio = stockJsonNode["statistics"]["Operating Cash Flow / Net Income Ratio"].asDouble(),
                    freeCashFlowConversion = stockJsonNode["statistics"]["Free Cash Flow Conversion"].asDouble(),
                    debtCoverageRatio = stockJsonNode["statistics"]["Debt Coverage Ratio"].asDouble(),
                    createdAt = Instant.now(),
                    updatedAt = Instant.now()
                )

                val savedStock = stockRepository.save(newStock)
                stockStatisticsRepository.save(newStockStatistics)
                return savedStock
            } catch (e: Exception) {
                throw Exception("Error occurred during process stock not present / Error: ${e.message}")
            }
        }
    }

    override fun getTopStocks(): List<StockDTOs.GetResult> {
        return stockRepository.findAll().sortedByDescending { it.total }.take(10).map { stockMapper.toGetResult(it) }
    }

    override fun isExpired(stock: Stock): Boolean {
        return stock.expiry.isBefore(LocalDateTime.now())
    }
}