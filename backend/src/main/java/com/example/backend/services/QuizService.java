package com.example.backend.services;

import com.example.backend.dto.QuizRequest;
import com.example.backend.dto.QuizResponse;
import com.example.backend.models.Question;
import com.example.backend.models.Quiz;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface QuizService {

    public List<QuizResponse> index();

    public QuizResponse show(Long id);

    public QuizResponse create(QuizRequest quiz);

    public QuizResponse update(Long id, QuizRequest updatedQuiz);

    public void delete(Long id);

//    public List<Question> getQuizQuestById(Long id);
}
