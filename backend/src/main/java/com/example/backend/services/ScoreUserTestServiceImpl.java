package com.example.backend.services;

import com.example.backend.dto.ScoreUserTestRequest;
import com.example.backend.dto.ScoreUserTestResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Quiz;
import com.example.backend.models.ScoreUserTest;
import com.example.backend.models.Test;
import com.example.backend.models.User;
import com.example.backend.repositories.ScoreUserTestRepository;
import com.example.backend.repositories.TestRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreUserTestServiceImpl implements ScoreUserTestService {

    @Autowired
    private ScoreUserTestRepository scoreUserTestRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TestRepository testRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ScoreUserTestResponse> getAllUserTest(){
        return scoreUserTestRepo.findAll().stream().map(el ->
                mapper.map(el, ScoreUserTestResponse.class)).toList();
    }

    @Override
    public List<UserResponse> getUserByTestId(Long testId) {
        return scoreUserTestRepo.findByTestId(testId).stream().map(el ->
                mapper.map(el, UserResponse.class)).toList();
    }

    @Override
    public ScoreUserTestResponse createUserTest(ScoreUserTestRequest req){
        Optional<ScoreUserTest> optional = scoreUserTestRepo.findByUserIdAndTestId(req.getUser().getId(), req.getTest().getId());
        ScoreUserTestResponse resp;
        if (optional.isPresent()) {
            resp = updateUserTest(optional.get().getId(), req);
        } else {
            User user = userRepo.findById(req.getUser().getId()).orElseThrow(() ->
                    new NotFoundException("L'Utilisateur", "d'id", req.getUser().getId()));
            Test test = testRepo.findById(req.getTest().getId()).orElseThrow(() ->
                    new NotFoundException("Le Test", "d'id", req.getTest().getId()));
            ScoreUserTest userTest = new ScoreUserTest(null, user, test, req.getNote());
//            ScoreUserTest userTest = mapper.map(req, ScoreUserTest.class);
            resp = mapper.map(scoreUserTestRepo.save(userTest), ScoreUserTestResponse.class);
        }
        return resp;
    }

    @Override
    public ScoreUserTest getUserTestById(Long id){
        return scoreUserTestRepo.findById(id).orElseThrow(()-> new EntityNotFoundException("User Answer not found"));
    }

    @Override
    public ScoreUserTestResponse updateUserTest(Long id, ScoreUserTestRequest req){
        ScoreUserTest userTest = getUserTestById(id);
        ScoreUserTest newUserTest = mapper.map(req, ScoreUserTest.class);
        newUserTest.setId(id);
        return mapper.map(scoreUserTestRepo.save(newUserTest), ScoreUserTestResponse.class);
    }

    @Override
    public void deleteUserTest(Long id){
        ScoreUserTest req = getUserTestById(id);
        scoreUserTestRepo.delete(req);
    }
}
