package com.example.backend.services;

import com.example.backend.dto.ConceptRequest;
import com.example.backend.dto.ConceptResponse;
import com.example.backend.dto.CoursResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Concept;
import com.example.backend.repositories.ConceptRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConceptServiceImpl implements ConceptService {

    @Autowired
    private ConceptRepository conceptRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ConceptResponse> index() {
        return conceptRepo.findAll().stream().map(el ->
                mapper.map(el, ConceptResponse.class)).toList();
    }

    @Override
    public ConceptResponse show(Long id) {
        Concept concept = conceptRepo.findById(id).orElseThrow(()
                -> new NotFoundException("Le concept", "d'id", id));
        return mapper.map(concept, ConceptResponse.class);
    }


    @Override
    public CoursResponse getCours(Long id) {
        Concept concept = conceptRepo.findById(id).orElseThrow(()
                -> new NotFoundException("Le concept", "d'id", id));
        return mapper.map(concept.getCours(), CoursResponse.class);
    }

    @Override
    public ConceptResponse create(ConceptRequest concept) {
        Concept newConcept = mapper.map(concept, Concept.class);
        return mapper.map(conceptRepo.save(newConcept), ConceptResponse.class);
    }

    @Override
    public ConceptResponse update(ConceptRequest concept, Long id) {
        conceptRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Le Concept que vous voulez modifier", "d'Id", id));
        Concept oldConcept = mapper.map(concept, Concept.class);
        oldConcept.setId(id);
        return mapper.map(conceptRepo.save(oldConcept), ConceptResponse.class);
    }

    @Override
    public void delete(Long id) {
        Concept concept = conceptRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Le Concept que voulez supprimer ", "d'Id", id));
        conceptRepo.delete(concept);
    }
}
