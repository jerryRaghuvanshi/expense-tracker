package com.example.expensetracker.mapper;
import com.example.expensetracker.dto.budgetDto.BudgetRequest;
import com.example.expensetracker.dto.budgetDto.BudgetResponse;
import com.example.expensetracker.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
@Mapper(componentModel = "spring")
public interface BudgetMapper {

    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "budget", source = "amount")
    @Mapping(target = "spent", ignore = true)
    @Mapping(target = "remaining", ignore = true)
    BudgetResponse toResponse(Budget budget);

    Budget toEntity(BudgetRequest request);

    List<BudgetResponse> toResponseList(List<Budget> budgets);

    void updateBudget(BudgetRequest request,
                      @MappingTarget Budget budget);
}