package com.example.backend.controllers;

import com.example.backend.dto.CoursRequest;
import com.example.backend.dto.CoursResponse;
import com.example.backend.models.Fichier;
import com.example.backend.services.CoursService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;

    @GetMapping("/")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public List<CoursResponse> indexCours() {
        return coursService.index();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public CoursResponse showCours(@PathVariable Long id) {
        return coursService.show(id);
    }

    @Operation( requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                    schema = @Schema(implementation = CoursRequest.class)
            )
        )
    )
    @PostMapping(value = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public CoursResponse createCours( @ModelAttribute CoursRequest cours ) {
        System.out.println(cours);
        System.out.println(cours.getFichier());
        return coursService.create(cours);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public CoursResponse updateCours(@RequestBody CoursRequest cours, @PathVariable Long id) {
        return coursService.update(cours, id);
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
    public void deleteCours(@PathVariable Long id) {
        coursService.delete(id);
    }
}
