package com.example.expensetracker.mapper;

import com.example.expensetracker.dto.budgetDto.BudgetRequest;
import com.example.expensetracker.dto.budgetDto.BudgetResponse;
import com.example.expensetracker.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(
        componentModel = "spring"
)
public interface BudgetMapper {

    BudgetResponse toResponse(Budget budget);
    Budget toEntity(BudgetRequest budgetRequest);
    List<BudgetResponse> toResponseList(List<Budget> budgets);
    void updateBudget(BudgetRequest request , @MappingTarget Budget budget);
}
