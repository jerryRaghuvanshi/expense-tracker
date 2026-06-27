package com.example.expensetracker.mapper;

import com.example.expensetracker.dto.expenseDto.ExpenseRequest;
import com.example.expensetracker.dto.expenseDto.ExpenseResponse;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



@Mapper(
        componentModel = "spring"
)
public interface ExpenseMapper {


    @Mapping(

            source="category.id",

            target="categoryId"

    )

    @Mapping(

            source="category.name",

            target="categoryName"

    )

    ExpenseResponse toResponse(

            Expense expense

    );

    Expense toEntity(ExpenseRequest expenseRequest);


    void updateExpense( ExpenseRequest expenseRequest, @MappingTarget Expense expense);
}
