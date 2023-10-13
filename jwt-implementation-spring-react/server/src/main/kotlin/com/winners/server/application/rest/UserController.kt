package com.winners.server.application.rest

import com.winners.server.application.dto.UserDTOs
import com.winners.server.application.rest.base.EntityController
import com.winners.server.domain.service.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
): EntityController<UserDTOs.GetResult, UserDTOs.PostRequest, UserDTOs.PutRequest> {
    @GetMapping
    override fun getEntities(
        pageable: Pageable
    ): ResponseEntity<Page<UserDTOs.GetResult>> {
        return try {
            val entities = userService.getEntities(pageable)
            ResponseEntity.ok(entities)
        } catch (e: Exception) {
            throw e
        }
    }

    @GetMapping("/{id}")
    override fun getEntityById(
        @PathVariable id: String,
        pageable: Pageable
    ): ResponseEntity<Page<UserDTOs.GetResult>> {
        return try {
            val entity = userService.getEntityById(id, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }

    @DeleteMapping("/{id}")
    override fun deleteEntityById(
        @PathVariable id: String,
        pageable: Pageable
    ): ResponseEntity<Page<UserDTOs.GetResult>> {
        return try {
            val entity = userService.deleteEntityById(id, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }

    @PutMapping("/{id}")
    override fun updateEntityById(
        @PathVariable id: String,
        @RequestBody entityRequest: UserDTOs.PutRequest,
        pageable: Pageable
    ): ResponseEntity<Page<UserDTOs.GetResult>> {
        return try {
            val entity = userService.updateEntityById(id, entityRequest, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }

    @PostMapping
    override fun createEntity(
        entityRequest: UserDTOs.PostRequest,
        pageable: Pageable
    ): ResponseEntity<Page<UserDTOs.GetResult>> {
        return try {
            val entity = userService.createEntity(entityRequest, pageable)
            ResponseEntity.ok(entity)
        } catch (e: Exception) {
            throw e
        }
    }
}