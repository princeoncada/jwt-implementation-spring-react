package com.winners.server.application.rest.base

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping

interface EntityController<GetResult, PostResult, PutResult> {
    fun getEntities(
        pageable: Pageable
    ): ResponseEntity<Page<GetResult>>

    fun getEntityById(
        id: String,
        pageable: Pageable
    ): ResponseEntity<Page<GetResult>>

    fun createEntity(
        entityRequest: PostResult,
        pageable: Pageable
    ): ResponseEntity<Page<GetResult>>

    fun updateEntityById(
        id: String,
        entityRequest: PutResult,
        pageable: Pageable
    ): ResponseEntity<Page<GetResult>>

    fun deleteEntityById(
        id: String,
        pageable: Pageable
    ): ResponseEntity<Page<GetResult>>
}