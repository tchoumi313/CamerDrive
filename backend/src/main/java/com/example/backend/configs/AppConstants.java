package com.example.backend.configs;

public class AppConstants {
    public static final String[] PUBLIC_POST_URLS = {"/register/**", "/login", "/register"};
    public static final String[] PUBLIC_GET_URLS = {"/v3/api-docs", "/v2/api-docs", "/v3/api-docs/**", "/swagger-ui/**",
            "/swagger-ui.html", "/configuration/**", "/swagger-resources", "/swagger-resources/**","/webjars/**", "v3/**",
            "favicon.ico", "/files/**"};

    public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=\\-_!])(?=\\S+$).{8,}$";

    public static final String ADMIN_AUTHORITY = "hasAuthority('ADMIN')";

    public static final String STUDENT_AUTHORITY = "hasAuthority('STUDENT')";

    public static final String INSTITUTER_AUTHORITY = "hasAuthority('INSTITUTER')";

    public static final String ADMIN_STUDENT_AUTHORITIES = "hasAnyAuthority('ADMIN', 'STUDENT')";

    public static final String ADMIN_INSTITUTER_AUTHORITIES = "hasAnyAuthority('ADMIN', 'INSTITUTER')";

    public static final String ALL_AUTHORITIES = "hasAnyAuthority('ADMIN', 'STUDENT', 'INSTITUTER')";

    public static final String STUDENT_ROLE = "STUDENT";

    public static final String INSTITUTER_ROLE = "INSTITUTER";

    public static final String ADMIN_ROLE = "ADMIN";

    public static final String PROFILE_PATH = "fichiers/profiles/";

    public static final String COURS_PATH = "fichiers/cours/";

    public static final String QUESTION_PATH = "fichiers/questions/";

    public static final String TEST_PATH = "fichiers/tests/";

}
