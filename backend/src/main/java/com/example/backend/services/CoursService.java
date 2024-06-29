package com.example.backend.services;

import com.example.backend.dto.CoursRequest;
import com.example.backend.dto.CoursResponse;

import java.util.List;

public interface CoursService {

    public List<CoursResponse> index();

    public CoursResponse show(Long id);

    public CoursResponse create(CoursRequest cours);

    public CoursResponse update(CoursRequest cours, Long id);

    public void delete(Long id);

}
