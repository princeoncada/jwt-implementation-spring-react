package com.winners.server.impl.domain.service

import com.winners.server.application.dto.RoleDTOs
import com.winners.server.application.mapper.RoleMapper
import com.winners.server.domain.repository.RoleRepository
import com.winners.server.domain.service.RoleService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*


@Service
class RoleServiceImpl(
    private val roleRepository: RoleRepository,
    private val roleMapper: RoleMapper
): RoleService {
    override fun getEntities(
        pageable: Pageable
    ): Page<RoleDTOs.GetResult> {
        return roleRepository.findAll(pageable).map { roleMapper.toGetResult(it) }
    }

    override fun getEntityById(
        id: String,
        pageable: Pageable
    ): Page<RoleDTOs.GetResult> {
        val entity = roleRepository.findById(id, pageable)
        return entity.map { roleMapper.toGetResult(it) }
    }

    override fun createEntity(
        entityRequest: RoleDTOs.PostRequest,
        pageable: Pageable
    ): Page<RoleDTOs.GetResult> {
        val entityId = UUID.randomUUID().toString()
        val savedEntity = roleRepository.save(roleMapper.createEntity(entityId, entityRequest))
        return roleRepository.findById(savedEntity.id, pageable).map { roleMapper.toGetResult(it) }
    }

    override fun updateEntityById(
        id: String,
        entityRequest: RoleDTOs.PutRequest,
        pageable: Pageable
    ): Page<RoleDTOs.GetResult> {
        val currentEntity = roleRepository.findById(id).get()
        val updatedEntity = roleRepository.save(roleMapper.updateEntity(currentEntity, entityRequest))
        return roleRepository.findById(updatedEntity.id, pageable).map { roleMapper.toGetResult(it) }
    }

    override fun deleteEntityById(
        id: String,
        pageable: Pageable
    ): Page<RoleDTOs.GetResult> {
        val currentEntity = roleRepository.findById(id).get()
        roleRepository.delete(currentEntity)
        return roleRepository.findAll(pageable).map { roleMapper.toGetResult(it) }
    }
}