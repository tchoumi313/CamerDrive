package com.example.backend.controllers;

import com.example.backend.dto.QuizRequest;
import com.example.backend.dto.QuizResponse;
import com.example.backend.services.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/")
    public List<QuizResponse> indexQuizzes(){
        return quizService.index();
    }

//    @GetMapping("/getQuizQuestById/{id}")
//    public List<Question> getQuizQuestById(@PathVariable Long id){
//        System.out.println("Inside Get Quiz by Id");
//        return quizService.getQuizQuestById(id);
//    }

    @GetMapping("/{id}")
    public QuizResponse showQuiz(@PathVariable Long id){
    return quizService.show(id);
    }

    @PostMapping("/")
    @Transactional
    public QuizResponse createQuiz(@RequestBody QuizRequest quiz){
        return quizService.create(quiz);
    }

    @PutMapping("/{id}")
    public QuizResponse updateQuiz(@PathVariable Long id, @RequestBody QuizRequest quiz){
        return quizService.update(id, quiz);
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
    public void deleteQuiz(@PathVariable Long id){
        quizService.delete(id);
    }
}
