package com.example.expensetracker.dto.budgetDto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.Month;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BudgetRequest {
    @NotNull
    @Positive
    private BigDecimal amount;


    @NotNull
    private Long categoryId;


    @NotNull
    private Month month;


    @NotNull
    private  Integer year;


}
