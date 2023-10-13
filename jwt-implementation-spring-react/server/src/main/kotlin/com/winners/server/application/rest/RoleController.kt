package com.winners.server.application.rest

import com.winners.server.application.dto.RoleDTOs
import com.winners.server.application.rest.base.EntityController
import com.winners.server.domain.service.RoleService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/roles")
class RoleController(
    private val roleService: RoleService
): EntityController<RoleDTOs.GetResult, RoleDTOs.PostRequest, RoleDTOs.PutRequest> {
    @GetMapping
    override fun getEntities(
        pageable: Pageable
    ): ResponseEntity<Page<RoleDTOs.GetResult>> {
        try {
            val entities = roleService.getEntities(pageable)
            return ResponseEntity.ok(entities)
        } catch (e: Exception) {
            throw e
        }
    }

    @GetMapping("/{id}")
    override fun getEntityById(
        @PathVariable id: String,
        pageable: Pageable
    ): ResponseEntity<Page<RoleDTOs.GetResult>> {
        return try {
            val entity = roleService.getEntityById(id, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }

    @DeleteMapping("/{id}")
    override fun deleteEntityById(
        @PathVariable id: String,
        pageable: Pageable
    ): ResponseEntity<Page<RoleDTOs.GetResult>> {
        return try {
            val entity = roleService.deleteEntityById(id, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }

    @PutMapping("/{id}")
    override fun updateEntityById(
        @PathVariable id: String,
        @RequestBody entityRequest: RoleDTOs.PutRequest,
        pageable: Pageable
    ): ResponseEntity<Page<RoleDTOs.GetResult>> {
        return try {
            val entity = roleService.updateEntityById(id, entityRequest, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }

    @PostMapping
    override fun createEntity(
        @RequestBody entityRequest: RoleDTOs.PostRequest,
        pageable: Pageable
    ): ResponseEntity<Page<RoleDTOs.GetResult>> {
        return try {
            val entity = roleService.createEntity(entityRequest, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }
}