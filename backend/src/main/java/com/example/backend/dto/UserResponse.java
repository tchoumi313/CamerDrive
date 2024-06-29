package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Date dateNaiss;
    private RoleResponse role;
    private FichierResponse profile;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
