package com.example.expensetracker.service;

import com.example.expensetracker.dto.categoryDto.CategoryResponse;
import com.example.expensetracker.dto.expenseDto.ExpenseRequest;
import com.example.expensetracker.dto.expenseDto.ExpenseResponse;
import com.example.expensetracker.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Month;
import java.util.List;

public interface ExpenseService {

    ExpenseResponse createExpense(ExpenseRequest expenseRequest, User user);
    Page<ExpenseResponse> getExpenses(User user, Long categoryId, Month month, Integer year, Pageable pageable

    );

    ExpenseResponse updateExpense(Long id ,ExpenseRequest expenseRequest, User user);
    void deleteExpense(Long id , User user);
}
