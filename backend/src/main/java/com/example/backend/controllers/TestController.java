package com.example.backend.controllers;

import com.example.backend.dto.TestRequest;
import com.example.backend.dto.TestResponse;
import com.example.backend.services.TestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public List<TestResponse> indexTests() {
        return testService.index();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public TestResponse showTest(@PathVariable Long id) {
        return testService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public TestResponse createTest(@RequestBody TestRequest test) {
        return testService.create(test);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public TestResponse updateTest(@PathVariable Long id, @RequestBody TestRequest test) {
        return testService.update(test, id);
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
    public void deleteTest(@PathVariable long id) {
        testService.delete(id);
    }
}
