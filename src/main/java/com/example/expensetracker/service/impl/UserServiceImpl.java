package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.authDto.RegisterRequest;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.execptions.EmailAlreadyExistsException;
import com.example.expensetracker.execptions.UserNameAlreadyExistsException;
import com.example.expensetracker.execptions.UserNotFoundException;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    public User register(RegisterRequest request) {

        if(userRepository.existsByEmail(request.getEmail())){
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if(userRepository.existsByUsername(request.getUsername())){
            throw new UserNameAlreadyExistsException("Username already exists");
        }


        User user = new User();

        user.setUsername(request.getUsername());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        return userRepository.save(user);

    }


    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new UserNotFoundException(
                                "User not found"
                        )
                );

    }

}
