package com.example.backend.controllers;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.FichierResponse;
import com.example.backend.services.FichierService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class FichierController {

    @Autowired
    private FichierService fichierService;

    @PostMapping(value = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public FichierResponse upload(@RequestBody MultipartFile file) {
        return fichierService.upload(file, AppConstants.PROFILE_PATH);
    }

    @Operation(
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200",
                            content = @Content(schema = @Schema(implementation = byte[].class))
                    ),
                    @ApiResponse(description = "Not found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal error", responseCode = "500", content = @Content)
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        return fichierService.download(id);
    }

}
