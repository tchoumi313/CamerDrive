package com.example.backend.services;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.FichierResponse;
import com.example.backend.dto.PasswordRequest;
import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.exceptions.BADException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Fichier;
import com.example.backend.models.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private FichierService fichierService;

    @Override
    public List<UserResponse> index() {
        return userRepo.findAll()
                .stream().map(el -> mapper.map(el, UserResponse.class)).toList();
    }

    @Override
    public UserResponse show(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("L'Utilisateur", "d'id", id));
        return mapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse create(UserRequest user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = mapper.map(user, User.class);
        newUser.setRole(roleRepo.findByNom(AppConstants.STUDENT_ROLE));

        return mapper.map(userRepo.save(newUser), UserResponse.class);
    }

    @Override
    public UserResponse update(UserRequest user, Long id) {
        User oldUser = userRepo.findById(id).orElseThrow(() -> new NotFoundException("L'Utilisateur", "d'id", id));
        User newUser = mapper.map(user, User.class);
        newUser.setId(id);
        newUser.setPassword(oldUser.getPassword());
        newUser.setRole(oldUser.getRole());
        return mapper.map(userRepo.save(newUser), UserResponse.class);
    }

    @Override
    public void delete(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new NotFoundException("L'utilisateur que vous voulez modifier ", "d'id", id));
        userRepo.delete(user);
    }

    @Override
    public UserResponse modifyPassword(Long id, PasswordRequest request) {
        User oldUser = userRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("L'User que vous voulez modifier ", "d'Id", id));
        if (passwordEncoder.matches(request.getOldPassword(), oldUser.getPassword())) {
            savePassword(oldUser, request.getNewPassword());
            return mapper.map(userRepo.save(oldUser), UserResponse.class);
        } else {
            throw new BADException("Votre ancien mot de passe ne correspond pas au mot de passe que vous avez entre");
        }
    }

    @Override
    public UserResponse createProfile(Long id, MultipartFile profile) {
        User user = userRepo.findById(id)
               .orElseThrow(() -> new NotFoundException("L'utilisateur que vous voulez modifier ", "d'id", id));
        if (user.getProfile() == null) {
            FichierResponse fichier = fichierService.upload(profile, AppConstants.PROFILE_PATH);
            user.setProfile(mapper.map(fichier, Fichier.class));
        } else {
            fichierService.changeUserProfile(user.getProfile().getId(), profile);
        }
        return mapper.map(userRepo.save(user), UserResponse.class);
    }

    public  void savePassword(User user, String password){
        if (!(password.matches(AppConstants.PASSWORD_REGEX)))
            throw new BADException("""
                    Le mot de passe doit avoir min 8 carateres et contenir au moins :
                    - Un chiffre,
                    - une lettre majuscule,
                    - une lettre minuscule,
                    - un caractere special,
                    - pas d'espace.""");
        user.setPassword(passwordEncoder.encode(password));
    }

}
