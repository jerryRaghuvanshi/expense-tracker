package com.example.expensetracker.dto.analyticsDto;

import lombok.*;

import java.math.BigDecimal;
import java.time.Month;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {


    BigDecimal totalBudget;


    BigDecimal totalSpent;


    BigDecimal remaining;


    String topCategory;


    Month month;


    Integer year;


}