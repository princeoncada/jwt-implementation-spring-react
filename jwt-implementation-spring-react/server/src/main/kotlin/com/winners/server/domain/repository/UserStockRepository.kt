package com.winners.server.domain.repository

import com.winners.server.domain.model.UserStock
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserStockRepository: JpaRepository<UserStock, String> {
}
