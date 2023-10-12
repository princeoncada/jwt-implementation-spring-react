package com.winners.server.domain.service

import com.winners.server.application.dto.UserDTOs
import com.winners.server.domain.service.base.EntityService
import org.springframework.stereotype.Service

@Service
interface UserService: EntityService<UserDTOs.GetResult, UserDTOs.PostRequest, UserDTOs.PutRequest> {
}