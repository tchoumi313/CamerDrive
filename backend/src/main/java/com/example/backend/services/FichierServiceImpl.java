package com.example.backend.services;

import com.example.backend.configs.AppConstants;
import com.example.backend.configs.FileFilter;
import com.example.backend.dto.FichierResponse;
import com.example.backend.exceptions.BADException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.exceptions.UnsupportedFileTypeException;
import com.example.backend.models.Fichier;
import com.example.backend.repositories.FichierRepository;
import jakarta.xml.bind.DatatypeConverter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
public class FichierServiceImpl implements FichierService {

    @Autowired
    private FichierRepository fichierRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private FileFilter fileFilter;

    @Override
    public Fichier show(Long id) {
        return fichierRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le fichier", "d'id", id));
    }

    @Override
    public ResponseEntity<byte[]> download(Long id) {
        Fichier fichier = show(id);
        String cheminFichierImage = fichier.getUrl();
        return getProfileByName(cheminFichierImage);
    }

    @Override
    public FichierResponse changeUserProfile(Long id, MultipartFile image) {
        try {
            Fichier profile = fichierRepo.findById(id).orElseThrow(() -> new NotFoundException("Le profile ", "d'id", id));
            Path toDelete = Paths.get(AppConstants.PROFILE_PATH, profile.getUrl());
            if (Files.exists(toDelete))
                Files.delete(toDelete);
            String nouvNom = copyImgToPath(image, AppConstants.PROFILE_PATH);
            profile.setUrl(AppConstants.PROFILE_PATH + nouvNom);
            return mapper.map(fichierRepo.save(profile), FichierResponse.class);
        } catch (IOException e){
            throw new BADException("Echec de la modification de l'image");
        }
    }

    @Override
    public FichierResponse upload(MultipartFile file, String path) {
        if (file.isEmpty())
            throw new BADException("Veillez selectionner une image");
        String nouveauNom = copyImgToPath(file, path);
//        String extension = getExtension(Objects.requireNonNull(file.getOriginalFilename()));
//        String nomHache = nouveauNom + "." + extension;
        Fichier fichier = new Fichier();
        fichier.setUrl(path + nouveauNom);
//        System.out.println(fichier);
        return mapper.map(fichierRepo.save(fichier), FichierResponse.class);
    }

    @Override
    public void delete(Long id) {
        Fichier fichier = show(id);
        Path toDelete = Paths.get(fichier.getUrl());
        try{
            if (Files.exists(toDelete))
                Files.delete(toDelete);
            fichierRepo.delete(fichier);
        } catch (IOException e) {
            throw new BADException("Impossible de supprimer le fichier");
        }
    }

    private String getExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    public static String copyImgToPath(MultipartFile image, String path) {
        File repertoire = new File(path);
        if (!repertoire.exists()) {
            boolean repertoireCree = repertoire.mkdirs();
            if (!repertoireCree) {
                throw new BADException("Impossible de créer le répertoire 'pictures'");
            }
        }
        if (image.isEmpty())
            throw new BADException("Veillez selectionner une image");

        String nomFichier = image.getOriginalFilename();
        String extension = FilenameUtils.getExtension(nomFichier);

        // Générer un nom de fichier unique et sécurisé
        byte[] imageBytes = null;
        try {
            imageBytes = image.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] hashBytes = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(imageBytes);
            hashBytes = md.digest();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        String hashString = DatatypeConverter.printHexBinary(hashBytes);

        // Ajouter un UUID pour garantir l'unicité
        String uniqueID = UUID.randomUUID().toString();
        String nouveauNom = hashString + "_" + uniqueID + "." + extension;

        File fichierDuServeur = new File(repertoire, nouveauNom);
        try {
            FileUtils.writeByteArrayToFile(fichierDuServeur, image.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return nouveauNom;
    }

    public ResponseEntity<byte[]> getProfileByName(String name) {
        try {
            Path cheminVersImages = Paths.get(name);
            byte[] imageBytes = Files.readAllBytes(cheminVersImages);
            String contentType = fileFilter.determineContentType(name);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentLength(imageBytes.length);
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (UnsupportedFileTypeException e) {
            // Gestion des exceptions lorsque le type MIME ne peut pas être résolu
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        } catch (IOException e) {
            // Gestion des exceptions liées à la lecture du fichier
            throw new BADException("Echec. Veillez reessayer");
        }
    }


}
