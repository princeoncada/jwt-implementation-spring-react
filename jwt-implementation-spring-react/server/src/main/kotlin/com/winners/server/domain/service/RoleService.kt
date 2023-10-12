package com.winners.server.domain.service

import com.winners.server.application.dto.RoleDTOs
import com.winners.server.domain.service.base.EntityService
import org.springframework.stereotype.Service

@Service
interface RoleService: EntityService<RoleDTOs.GetResult, RoleDTOs.PostRequest, RoleDTOs.PutRequest> {
}
