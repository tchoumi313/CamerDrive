package com.example.backend.repositories;

import com.example.backend.models.Cours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursRepository extends JpaRepository<Cours, Long> {
}
