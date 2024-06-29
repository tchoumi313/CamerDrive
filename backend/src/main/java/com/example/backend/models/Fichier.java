package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "fichiers")
public class Fichier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotNull(message = "url: ce champs est obligatoire")
    private String url;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @OneToOne(mappedBy = "image", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
    private Cours cours;

    @OneToOne(mappedBy = "image", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
    private Question question;

    @OneToOne(mappedBy = "profile", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
    private User user;

}
