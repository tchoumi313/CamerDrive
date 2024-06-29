package com.example.backend.services;

import com.example.backend.dto.FichierResponse;
import com.example.backend.models.Fichier;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FichierService {
    public FichierResponse upload(MultipartFile file, String path);

    public Fichier show(Long id);

    public ResponseEntity<byte[]> download(Long id);

    public FichierResponse changeUserProfile(Long id, MultipartFile image);

    void delete(Long id) throws IOException;
}
