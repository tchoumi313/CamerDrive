package com.example.backend.controllers;

import com.example.backend.dto.ScoreUserTestRequest;
import com.example.backend.dto.ScoreUserTestResponse;
import com.example.backend.repositories.ScoreUserTestRepository;
import com.example.backend.services.ScoreUserTestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score_user_test")
public class ScoreUserTestController {

    @Autowired
    private ScoreUserTestService userTestService;

    @Autowired
    private ScoreUserTestRepository userTestRepo;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public List<ScoreUserTestResponse> indexScoreUserTest() {
        return userTestService.getAllUserTest();
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ScoreUserTestResponse createUserTest(@RequestBody ScoreUserTestRequest request) {
        return userTestService.createUserTest(request);
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
    public void deleteUserTest(@PathVariable Long id) {
        userTestService.deleteUserTest(id);
    }

}
