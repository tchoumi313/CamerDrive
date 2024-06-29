package com.example.backend.services;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.ConceptResponse;
import com.example.backend.dto.CoursRequest;
import com.example.backend.dto.CoursResponse;
import com.example.backend.dto.FichierResponse;
import com.example.backend.exceptions.BADException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Cours;
import com.example.backend.models.Fichier;
import com.example.backend.repositories.CoursRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CoursServiceImpl implements CoursService {

    @Autowired
    private CoursRepository coursRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private FichierService fichierService;


    @Override
    public List<CoursResponse> index() {
//        Pageable pageable = Pageable.ofSize(15);
        return coursRepo.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public CoursResponse show(Long id) {
        Cours cours = coursRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Cours ", "d'id", id));
        return toDto(cours);
    }

    @Override
    public CoursResponse create(CoursRequest cours) {
        Fichier fichier = null;
        if (!cours.getFichier().isEmpty()) {
            FichierResponse fichierResp = fichierService.upload(cours.getFichier(), AppConstants.COURS_PATH);
            fichier = mapper.map(fichierResp, Fichier.class);
        }
        Cours req = mapper.map(cours, Cours.class);
        req.setImage(fichier);
        return mapper.map(coursRepo.save(req), CoursResponse.class);
    }

    @Override
    public CoursResponse update(CoursRequest cours, Long id) {
        Cours req = coursRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le cours que vous voulez modifier ", "d'id", id));
        Cours newCours = mapper.map(cours, Cours.class);
        newCours.setId(id);
        newCours.setImage(req.getImage());
        return mapper.map(coursRepo.save(newCours), CoursResponse.class);
    }

    @Override
    public void delete(Long id) {
        Cours cours = coursRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le cours que vous voulez supprimer ", "d'id", id));
        try {
            if (cours.getImage() != null) {
                fichierService.delete(cours.getImage().getId());
            }
            coursRepo.delete(cours);
        } catch (IOException e) {
            throw new BADException("Erreur lors de la suppression de l'image");
        }
    }

    public CoursResponse toDto(Cours cours) {
        CoursResponse resp = new CoursResponse();
        resp = mapper.map(cours, CoursResponse.class);
        resp.setConcepts(cours.getConcepts().stream().map(el ->
                mapper.map(el, ConceptResponse.class)).toList());
        return resp;
    }
}
