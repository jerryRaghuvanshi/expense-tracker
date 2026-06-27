package com.example.expensetracker.dto.expenseDto;

import com.example.expensetracker.entity.Category;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseResponse {

    Long id;
    BigDecimal amount;
    Long categoryId;
    String categoryName;
    String description;
    LocalDate expenseDate;
}
