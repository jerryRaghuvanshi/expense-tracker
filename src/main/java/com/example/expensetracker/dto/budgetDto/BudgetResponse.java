package com.example.expensetracker.dto.budgetDto;

import lombok.*;

import java.math.BigDecimal;
import java.time.Month;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetResponse {
    Long id;


    String categoryName;


    BigDecimal budget;


    BigDecimal spent;


    BigDecimal remaining;
     Month month;


     Integer year;
}
