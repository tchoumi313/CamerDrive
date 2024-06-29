package com.example.backend.controllers;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.RoleRequest;
import com.example.backend.dto.RoleResponse;
import com.example.backend.services.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@PreAuthorize(AppConstants.ADMIN_AUTHORITY)
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public List<RoleResponse> indexRoles(){
        return roleService.index();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public RoleResponse showRole(@PathVariable Long id) {
        return roleService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public RoleResponse create(@Valid @RequestBody RoleRequest role) {
        return roleService.create(role);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public RoleResponse update(@PathVariable Long id, @Valid @RequestBody RoleRequest role) {
        return roleService.update(role, id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "204"
                    ),
                    @ApiResponse(description = "Bad Exception", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Not found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal error", responseCode = "500", content = @Content)
            }
    )
    public void delete(@PathVariable Long id) {
        roleService.delete(id);
    }

}