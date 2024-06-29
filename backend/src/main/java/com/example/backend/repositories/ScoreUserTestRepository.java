package com.example.backend.repositories;

import com.example.backend.models.ScoreUserTest;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScoreUserTestRepository extends JpaRepository<ScoreUserTest, Long> {
    List<User> findByTestId(Long testId);

    Optional<ScoreUserTest> findByUserIdAndTestId(Long userId, Long testId);
}
