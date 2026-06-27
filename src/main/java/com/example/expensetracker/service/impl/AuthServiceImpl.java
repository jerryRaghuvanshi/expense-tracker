package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.authDto.AuthenticationResponse;
import com.example.expensetracker.dto.authDto.LoginRequest;
import com.example.expensetracker.dto.authDto.RegisterRequest;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.security.JwtService;
import com.example.expensetracker.service.AuthService;
import com.example.expensetracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {
    private final UserService userService;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    @Override
    public AuthenticationResponse register(
            RegisterRequest request
    ) {

        User user = userService.register(request);
        String jwt =
                jwtService.generateToken(user);
        return AuthenticationResponse

                .builder()

                .token(jwt)

                .build();

    }

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getEmail(),

                        request.getPassword()

                )

        );
        User user =
                userService.findByEmail(

                        request.getEmail()

                );
        String jwt =
                jwtService.generateToken(user);
        return AuthenticationResponse

                .builder()

                .token(jwt)

                .build();
    }


}
