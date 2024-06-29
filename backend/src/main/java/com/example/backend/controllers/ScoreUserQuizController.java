package com.example.backend.controllers;

import com.example.backend.dto.ScoreUserQuizRequest;
import com.example.backend.dto.ScoreUserQuizResponse;
import com.example.backend.repositories.ScoreUserQuizRepository;
import com.example.backend.services.ScoreUserQuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score_user_quiz")
public class ScoreUserQuizController {

    @Autowired
    private ScoreUserQuizService userQuizService;

    @Autowired
    private ScoreUserQuizRepository userQuizRepo;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public List<ScoreUserQuizResponse> indexScoreUserQuiz() {
        return userQuizService.getAllUserQuiz();
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ScoreUserQuizResponse createUserQuiz(@RequestBody ScoreUserQuizRequest request) {
        return userQuizService.createUserQuiz(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "204"
                    ),
                    @ApiResponse(description = "Bad Exception", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Not found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal error", responseCode = "500", content = @Content)
            }
    )
    public void deleteUserQuiz(@PathVariable Long id) {
        userQuizService.deleteUserQuiz(id);
    }

}
