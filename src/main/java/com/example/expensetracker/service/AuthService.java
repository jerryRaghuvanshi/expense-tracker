package com.example.expensetracker.service;

import com.example.expensetracker.dto.authDto.AuthenticationResponse;
import com.example.expensetracker.dto.authDto.LoginRequest;
import com.example.expensetracker.dto.authDto.RegisterRequest;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(LoginRequest request);

}
