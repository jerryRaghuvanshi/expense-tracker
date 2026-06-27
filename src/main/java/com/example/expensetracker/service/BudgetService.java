package com.example.expensetracker.service;

import com.example.expensetracker.dto.budgetDto.BudgetRequest;
import com.example.expensetracker.dto.budgetDto.BudgetResponse;

import com.example.expensetracker.entity.User;

import java.util.List;
public interface BudgetService {
    BudgetResponse createBudget(
            BudgetRequest request,
            User user
    );



    List<BudgetResponse>

    getBudgets(

            User user
    );
    void deleteBudget(
            Long id,
            User user
    );

    BudgetResponse updateBudget(
            Long id,
            BudgetRequest request,
            User user
    );



}
