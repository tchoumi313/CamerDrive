package com.example.backend.services;

import com.example.backend.dto.QuestionRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.models.Question;

import java.util.List;

public interface QuestionService {

    public List<QuestionResponse> index();

    public QuestionResponse show(Long id);

    public QuestionResponse create(QuestionRequest question);

    public QuestionResponse update(Long id, QuestionRequest updatedQuestion);

    public void delete(Long id);
}
