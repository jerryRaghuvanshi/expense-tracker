package com.example.expensetracker.service;

import com.example.expensetracker.entity.User;

import java.io.ByteArrayInputStream;

public interface CsvService {
    ByteArrayInputStream exportExpenses(User user);
}
