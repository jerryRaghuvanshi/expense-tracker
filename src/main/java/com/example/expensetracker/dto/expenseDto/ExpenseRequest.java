package com.example.expensetracker.dto.expenseDto;

import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseRequest {
    @NotNull
    @Positive
    private BigDecimal amount;

    @Size(max = 500)
    private String description;

    @NonNull
    LocalDate expenseDate;

    @NotNull
    private Long categoryId;


}
