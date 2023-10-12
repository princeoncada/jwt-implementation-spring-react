package com.winners.server.application.mapper.base

interface EntityMapper<Entity, GetResult, PostRequest, PutRequest> {
    fun toGetResult(entity: Entity): GetResult
    fun createEntity(id: String, entityRequest: PostRequest): Entity
    fun updateEntity(entity: Entity, entityRequest: PutRequest): Entity
}
