package com.example.backend.services;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.FichierResponse;
import com.example.backend.dto.QuestionRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.exceptions.BADException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Fichier;
import com.example.backend.models.Question;
import com.example.backend.repositories.QuestionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService{

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private FichierService fichierService;

    @Override
    public List<QuestionResponse> index(){
//        Pageable pageable = Pageable.ofSize(15);
        return questionRepo.findAll().stream().map(el ->
                mapper.map(el, QuestionResponse.class)).toList();
    }

    @Override
    public QuestionResponse show(Long id){
        Question question = questionRepo.findById(id).orElseThrow(() ->
                new NotFoundException("La Question ", "d'id", id));
        return mapper.map(question, QuestionResponse.class);
    }
    
    @Override
    public QuestionResponse create(QuestionRequest question){
        Fichier fichier = null;
        if (!question.getFichier().isEmpty()) {
            FichierResponse fichierResp = fichierService.upload(question.getFichier(), AppConstants.QUESTION_PATH);
            fichier = mapper.map(fichierResp, Fichier.class);
        }
        Question req = mapper.map(question, Question.class);
        req.setImage(mapper.map(fichier, Fichier.class));
        return mapper.map(questionRepo.save(req), QuestionResponse.class);
    }

    @Override
    public QuestionResponse update(Long id, QuestionRequest updated){
        Question old = questionRepo.findById(id).orElseThrow(() ->
                new NotFoundException("La question que vous voulez modifier ", "d'id", id));
        Question newQuestion = mapper.map(updated, Question.class);
        newQuestion.setId(id);
        newQuestion.setImage(old.getImage());
        return mapper.map(questionRepo.save(newQuestion), QuestionResponse.class);
    }

    @Override
    public void delete(Long id){
        Question question = questionRepo.findById(id).orElseThrow(() ->
                new NotFoundException("La Question que vous voulez supprimer ", "d'id", id));
        try{
            if (question.getImage() != null) {
                fichierService.delete(question.getImage().getId());
            }
            questionRepo.delete(question);
        } catch (IOException e) {
            throw new BADException("Erreur lors de la suppression de l'image");
        }
    }
}
