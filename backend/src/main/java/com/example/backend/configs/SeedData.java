package com.example.backend.configs;

import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.SimpleDateFormat;

@Configuration
public class SeedData implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.count() == 0) {
            Role adminRole = new Role();
            adminRole.setNom("ADMIN");
            adminRole.setDescription("Administrateur");
            roleRepo.save(adminRole);
            Role instRole = new Role();
            instRole.setNom("INSTITUTER");
            instRole.setDescription("Instituteur(rice)");
            roleRepo.save(instRole);
            Role stdRole = new Role();
            stdRole.setNom("STUDENT");
            stdRole.setDescription("Simple utilisateur");
            roleRepo.save(stdRole);
        }
        if (userRepo.count() == 0) {
            User user = new User();
            user.setUsername("admin");
            user.setEmail("admin@admin.com");
            user.setPassword(encoder.encode("P@ssword1"));
            user.setDateNaiss(new SimpleDateFormat("yyyy-MM-dd").parse("2000-01-01"));
            Role role = new Role();
            role.setNom("ADMIN");
            user.setRole(roleRepo.findByNom(AppConstants.ADMIN_ROLE));
            userRepo.save(user);
        }
    }
}
