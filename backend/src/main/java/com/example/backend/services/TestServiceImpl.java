package com.example.backend.services;

import com.example.backend.dto.QuestionResponse;
import com.example.backend.dto.TestRequest;
import com.example.backend.dto.TestResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Question;
import com.example.backend.models.Test;
import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.TestRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<TestResponse> index() {
//        Pageable pageable = Pageable.ofSize(15);
        return testRepo.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public TestResponse show(Long id) {
        Test test = testRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Test ", "d'id", id));
        return toDto(test);
    }

    @Override
    public TestResponse create(TestRequest test) {
        Test req = mapper.map(test, Test.class);

        List<Question> questions = new ArrayList<>();
        for (QuestionResponse questionResp : test.getQuestions()) {
            Question question = questionRepo.findById(questionResp.getId())
                    .orElseThrow(() -> new NotFoundException("La question ", "d'id", questionResp.getId()));
            questions.add(question);
        }
        req.setQuestions(questions);

        System.out.println(req);
        return mapper.map(testRepo.save(req), TestResponse.class);
    }

    @Override
    public TestResponse update(TestRequest test, Long id) {
        Test req = testRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Test que vous voulez modifier ", "d'id", id));
        req.setId(id);
        return mapper.map(testRepo.save(req), TestResponse.class);
    }

    @Override
    public void delete(Long id) {
        Test test = testRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Test que vous voulez supprimer ", "d'id", id));
        testRepo.delete(test);
    }

    public TestResponse toDto(Test test) {
        TestResponse resp = new TestResponse();
        resp = mapper.map(test, TestResponse.class);
        resp.setQuestions(test.getQuestions().stream().map(el ->
                mapper.map(el, QuestionResponse.class)).toList());
        return resp;
    }
}

