package com.winners.server.impl.domain.service

import com.winners.server.application.dto.UserDTOs
import com.winners.server.application.mapper.UserMapper
import com.winners.server.domain.repository.UserRepository
import com.winners.server.domain.service.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
): UserService {
    override fun getEntities(
        pageable: Pageable
    ): Page<UserDTOs.GetResult> {
        return userRepository.findAll(pageable).map { userMapper.toGetResult(it) }
    }

    override fun getEntityById(
        id: String,
        pageable: Pageable
    ): Page<UserDTOs.GetResult> {
        val entity = userRepository.findById(id, pageable)
        return entity.map { userMapper.toGetResult(it) }
    }

    override fun createEntity(
        entityRequest: UserDTOs.PostRequest,
        pageable: Pageable
    ): Page<UserDTOs.GetResult> {
        val entityId = UUID.randomUUID().toString()
        val savedEntity = userRepository.save(userMapper.createEntity(entityId, entityRequest))
        return userRepository.findById(savedEntity.id, pageable).map { userMapper.toGetResult(it) }
    }

    override fun updateEntityById(
        id: String,
        entityRequest: UserDTOs.PutRequest,
        pageable: Pageable
    ): Page<UserDTOs.GetResult> {
        val currentEntity = userRepository.findById(id).get()
        val updatedEntity = userRepository.save(userMapper.updateEntity(currentEntity, entityRequest))
        return userRepository.findById(updatedEntity.id, pageable).map { userMapper.toGetResult(it) }
    }

    override fun deleteEntityById(
        id: String,
        pageable: Pageable
    ): Page<UserDTOs.GetResult> {
        val currentEntity = userRepository.findById(id).get()
        userRepository.delete(currentEntity)
        return userRepository.findAll(pageable).map { userMapper.toGetResult(it) }
    }
}