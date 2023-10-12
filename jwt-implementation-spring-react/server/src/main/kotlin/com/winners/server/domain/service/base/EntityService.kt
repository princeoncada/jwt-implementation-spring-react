package com.winners.server.domain.service.base

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
interface EntityService<GetResult, PostRequest, PutRequest> {
    fun getEntities(
        pageable: Pageable
    ): Page<GetResult>

    fun getEntityById(
        id: String,
        pageable: Pageable
    ): Page<GetResult>

    fun createEntity(
        entityRequest: PostRequest,
        pageable: Pageable
    ): Page<GetResult>

    fun updateEntityById(
        id: String,
        entityRequest: PutRequest,
        pageable: Pageable
    ): Page<GetResult>

    fun deleteEntityById(
        id: String,
        pageable: Pageable
    ): Page<GetResult>
}