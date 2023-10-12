package com.winners.server.application.mapper

import com.winners.server.application.dto.RoleDTOs
import com.winners.server.application.mapper.base.EntityMapper
import com.winners.server.domain.model.Role
import org.springframework.stereotype.Component
import java.time.Instant

@Component
class RoleMapper: EntityMapper<Role, RoleDTOs.GetResult, RoleDTOs.PostRequest, RoleDTOs.PutRequest> {
    override fun toGetResult(
        entity: Role
    ): RoleDTOs.GetResult {
        return RoleDTOs.GetResult(
            id = entity.id,
            name = entity.name
        )
    }

    override fun createEntity(
        id: String,
        entityRequest: RoleDTOs.PostRequest
    ): Role {
        return Role(
            id = id,
            name = entityRequest.name,
            createdAt = Instant.now(),
            updatedAt = Instant.now()
        )
    }

    override fun updateEntity(
        entity: Role,
        entityRequest: RoleDTOs.PutRequest
    ): Role {
        return Role(
            id = entity.id,
            name = entityRequest.name ?: entity.name,
            createdAt = entity.createdAt,
            updatedAt = Instant.now()
        )
    }
}
