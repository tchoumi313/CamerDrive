package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Role findByNom(String nom);
}