package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String libelle;

    @Column(nullable = false)
    private String option1;

    @Column(nullable = false)
    private String option2;

    private String option3;

    private String option4;

    @Column(nullable = false)
    private String correctOption;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @ManyToMany(mappedBy = "questions", cascade = CascadeType.ALL)
    private List<Quiz> quizzes = new ArrayList<>();

    @ManyToMany(mappedBy = "questions", cascade = CascadeType.ALL)
    private List<Test> tests = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "image")
    private Fichier image;
}
