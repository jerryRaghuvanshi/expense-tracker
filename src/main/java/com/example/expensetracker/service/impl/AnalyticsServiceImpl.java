package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.analyticsDto.CategoryBreakdownResponse;
import com.example.expensetracker.dto.analyticsDto.DashboardResponse;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.BudgetRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.service.AnalyticsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {
    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    @Override
    public DashboardResponse getDashboard(User user, Month month, Integer year) {
        BigDecimal budget = budgetRepository.getTotalBudget(user, month.getValue(), year);
        BigDecimal spent = expenseRepository.getSpentAmount(user,month.getValue(),year);
        BigDecimal remaining = budget.subtract(spent);
        List<CategoryBreakdownResponse> breakdown = expenseRepository.getCategorySpendingBreakdown(user, month.getValue(), year);
        String topCategory = breakdown.isEmpty() ? "N/A" : breakdown.getFirst().getCategoryName();


        return DashboardResponse.builder()
                .totalBudget(budget)
                .totalSpent(spent)
                .remaining(remaining)
                .topCategory(topCategory)
                .month(month)
                .year(year)
                .build();

    }

    @Override
    public List<CategoryBreakdownResponse> getBreakdown(User user, Month month, Integer year) {
        return expenseRepository.getCategorySpendingBreakdown(user, month.getValue(), year);
    }
}
