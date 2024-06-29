package com.example.backend.configs;

import com.example.backend.exceptions.UnsupportedFileTypeException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;

@Component
public class FileFilter {

    public String determineContentType(String filePath) throws UnsupportedFileTypeException {
        String fileExtension = FilenameUtils.getExtension(filePath);

        return switch (fileExtension.toLowerCase()) {
            case "jpeg", "jpg" -> "image/jpeg";
            case "png" -> "image/png";
            case "gif" -> "image/gif";
            case "mp4" -> "video/mp4";
            case "webm" -> "video/webm";
            case "pdf" -> "application/pdf";
            case "doc" -> "application/msword";
            case "docx" -> "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case "txt" -> "text/plain";
            // Ajoutez d'autres cas pour les formats de fichier supplémentaires que vous souhaitez gérer
            default -> throw new UnsupportedFileTypeException("Type de fichier non pris en charge : " + fileExtension);
        };
    }
}