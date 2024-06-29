package com.example.backend.controllers;

import com.example.backend.dto.QuestionRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.services.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public List<QuestionResponse> indexQuestions(){
        return questionService.index();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public QuestionResponse showQuestion(@PathVariable Long id){
        return questionService.show(id);
    }

    @Operation( requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                    schema = @Schema(implementation = QuestionRequest.class)
            )
    )
    )
    @PostMapping(value = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionResponse createQuestion(@ModelAttribute QuestionRequest question){
        return questionService.create(question);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public QuestionResponse updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest question){
       return questionService.update(id, question);
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
    public void deleteQuestion(@PathVariable Long id){
        questionService.delete(id);
    }

}
