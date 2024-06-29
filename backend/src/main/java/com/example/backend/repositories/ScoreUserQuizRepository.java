package com.example.backend.repositories;

import com.example.backend.models.ScoreUserQuiz;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface ScoreUserQuizRepository extends JpaRepository<ScoreUserQuiz, Long> {
    Collection<User> findByQuizId(Long quizId);

    Optional<ScoreUserQuiz> findByUserIdAndQuizId(Long userId, Long quizId);
}
