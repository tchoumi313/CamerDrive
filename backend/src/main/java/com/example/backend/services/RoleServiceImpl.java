package com.example.backend.services;

import com.example.backend.dto.RoleRequest;
import com.example.backend.dto.RoleResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Role;
import com.example.backend.repositories.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<RoleResponse> index() {
        return roleRepo.findAll()
                .stream().map(el->modelMapper.map(el, RoleResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public RoleResponse show(Long id) {
        Role role = roleRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Le Role", "d'Id", id));
        return modelMapper.map(role, RoleResponse.class);
    }

    @Override
    public RoleResponse create(RoleRequest role) {
        Role newRole = modelMapper.map(role, Role.class);
        return modelMapper.map(roleRepo.save(newRole), RoleResponse.class);
    }

    @Override
    public RoleResponse update(RoleRequest role, Long id) {
        roleRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Le Role que vous voulez modifier", "d'Id", id));
                Role oldRole = modelMapper.map(role, Role.class);
        oldRole.setId(id);
        return modelMapper.map(roleRepo.save(oldRole), RoleResponse.class);
    }

    @Override
    public void delete(Long id) {
        Role role = roleRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Le Role que voulez supprimer ", "d'Id", id));
        roleRepo.delete(role);
    }

}
