package com.example.backend.controllers;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.FichierResponse;
import com.example.backend.dto.PasswordRequest;
import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.services.FichierService;
import com.example.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

//    @Autowired
//    private FichierService fichierService;

    @GetMapping("/")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> indexUsers() {
        return userService.index();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public UserResponse showUser(@PathVariable Long id) {
        return userService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@RequestBody @Valid UserRequest user){
        return this.userService.create(user);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserResponse updateUser(@PathVariable Long id, @RequestBody @Valid UserRequest user) {
        return this.userService.update(user, id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(AppConstants.ADMIN_AUTHORITY)
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
    public void deleteUser(@PathVariable Long id) {
        this.userService.delete(id);
    }

    @PutMapping("/password/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserResponse modifyPassword(@PathVariable Long id, @Valid @RequestBody PasswordRequest request){
        return  userService.modifyPassword(id, request);
    }

    @PutMapping(value = "/profile/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserResponse createProfile(@PathVariable Long id, @RequestParam("profile") MultipartFile profile) {
        return userService.createProfile(id, profile);
    }

//    @PutMapping(value = "profile/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public FichierResponse changeProfile(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
//        return fichierService.changeUserProfile(id, image);
//    }
}
