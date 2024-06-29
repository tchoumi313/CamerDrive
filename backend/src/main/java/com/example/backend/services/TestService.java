package com.example.backend.services;

import com.example.backend.dto.TestRequest;
import com.example.backend.dto.TestResponse;

import java.util.List;

public interface TestService {

    public List<TestResponse> index();

    public TestResponse show(Long id);

    public TestResponse create(TestRequest test);

    public TestResponse update(TestRequest test, Long id);

    public void delete(Long id);

}
