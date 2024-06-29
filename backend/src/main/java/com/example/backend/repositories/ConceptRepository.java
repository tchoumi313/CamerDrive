package com.example.backend.repositories;

import com.example.backend.models.Concept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConceptRepository extends JpaRepository<Concept, Long> {
}
