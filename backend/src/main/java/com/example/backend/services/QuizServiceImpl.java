package com.example.backend.services;

import com.example.backend.dto.CoursResponse;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.dto.QuizRequest;
import com.example.backend.dto.QuizResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Question;
import com.example.backend.models.Quiz;
import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepo;

    @Autowired
    private QuestionRepository questionRepo;

    private final ModelMapper mapper;


    @Override
    public List<QuizResponse> index() {
//        Pageable pageable = PageRequest.of(0, 15);
//        Page<Quiz> quizPage = quizRepo.findAll(pageable);
        return quizRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public QuizResponse create(QuizRequest quiz){
        Quiz req = mapper.map(quiz, Quiz.class);
        System.out.println(req);

        List<Question> questions = new ArrayList<>();
        for (QuestionResponse questionResp : quiz.getQuestions()) {
            Question question = questionRepo.findById(questionResp.getId())
                    .orElseThrow(() -> new NotFoundException("La question ", "d'id", questionResp.getId()));
            questions.add(question);
        }
        req.setQuestions(questions);

        return mapper.map(quizRepo.save(req), QuizResponse.class);
    }

    @Override
    public QuizResponse show(Long id){
        Quiz quiz = quizRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Quiz ", "d'id", id));
//        System.out.println(quiz);
        return toDto(quiz);
    }

    @Override
    public QuizResponse update(Long id, QuizRequest updatedQuiz){
        Quiz old = quizRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Quiz que vous voulez modifier ", "d'id", id));
        Quiz quiz = mapper.map(updatedQuiz, Quiz.class);
        quiz.setId(id);
        return mapper.map(quiz, QuizResponse.class);
    }

    @Override
    public void delete(Long id){
        Quiz quiz = quizRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Quiz que vous voulez supprimer ", "d'id", id));
        quizRepo.delete(quiz);
    }

//    public List<Question> getQuizQuestById(Long id){
//        System.out.println("Id"+id);
//        List<QuizQuestion> quizQuestList = quizQuestionRepository.findByQuiz(getQuizById(id));
//        List<Question> questionList = new ArrayList<>();
//        for (QuizQuestion quizQues: quizQuestList){
//            Optional<Question> optionalQuestions = questionRepository.findById(quizQues.getQuestion().getId());
//            optionalQuestions.ifPresent(questionList::add);
//        }
//
//        questionList.forEach(q->System.out.println(q.getLibelle()));
//        return questionList;
//    }`
    public QuizResponse toDto(Quiz quiz) {
        QuizResponse resp = new QuizResponse();
        resp.setId(quiz.getId());
        resp.setTitre(quiz.getTitre());
        resp.setQuestions(quiz.getQuestions().stream().map(el -> mapper.map(el, QuestionResponse.class)).toList());
        resp.setCreatedAt(quiz.getCreatedAt());
        resp.setUpdatedat(quiz.getUpdatedAt());
//        resp = mapper.map(quiz, QuizResponse.class);
//        resp.setCours(mapper.map(quiz.getCours(), CoursResponse.class));
        resp.setQuestions(quiz.getQuestions().stream().map(el ->
                mapper.map(el, QuestionResponse.class)).toList());
        return resp;
    }
}
