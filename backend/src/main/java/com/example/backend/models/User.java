package com.example.backend.models;

import com.example.backend.configs.AppConstants;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotNull(message = "username : Ce champ est obligatoire")
    @NotBlank(message = "username : Ce champ ne doit pas etre vide")
    private String username;

    @Column(unique = true)
    @Email(message = "L'email n'est pas valide")
    @NotNull(message = "email : Ce champ est obligatoire")
    @NotBlank(message = "email : Ce champ ne doit pas etre vide")
    private String email;

    @Pattern(regexp = AppConstants.PASSWORD_REGEX, message = """
            Le mot de passe doit avoir min 8 carateres et contenir au moins :
            - Un chiffre ,
            - Une lettre majuscule,
            - Une lettre minuscule,
            - Un caractere special,
            - Pas d'espace.""")
    @NotNull(message = "password : Ce champ est obligatoire")
    @NotBlank(message = "password : Ce champ ne doit pas etre vide")
    private String password;

    @Column(name = "date_naiss")
    @NotNull(message = "Date de naissance: Ce champ est obligatoire")
    private Date dateNaiss;

    @ManyToOne
    private Role role;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_cours",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "cours_id"))
    private List<Cours> cours = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ScoreUserTest> scoreUserTests;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ScoreUserQuiz> scoreUserQuizzes;

    @OneToOne
    @JoinColumn(name = "profile")
    private Fichier profile;

}
