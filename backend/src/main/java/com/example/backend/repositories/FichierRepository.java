package com.example.backend.repositories;

import com.example.backend.models.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FichierRepository extends JpaRepository<Fichier, Long> {
}
