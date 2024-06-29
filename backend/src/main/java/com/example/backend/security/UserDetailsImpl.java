package com.example.backend.security;

import com.example.backend.models.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@Data
@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getNom()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }

}