package com.example.backend.services;

import com.example.backend.dto.RoleRequest;
import com.example.backend.dto.RoleResponse;

import java.util.List;

public interface RoleService {

    public List<RoleResponse> index();

    public RoleResponse show(Long id);

    public RoleResponse create(RoleRequest role);

    public RoleResponse update(RoleRequest role, Long id);

    public void delete(Long id);
}
