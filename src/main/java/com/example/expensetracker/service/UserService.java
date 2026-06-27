package com.example.expensetracker.service;

import com.example.expensetracker.dto.authDto.RegisterRequest;
import com.example.expensetracker.entity.User;


public interface UserService {

    User register(RegisterRequest request);

    User findByEmail(String email);

}
