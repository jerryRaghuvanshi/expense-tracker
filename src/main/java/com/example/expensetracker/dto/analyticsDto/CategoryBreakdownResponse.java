package com.example.expensetracker.dto.analyticsDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class CategoryBreakdownResponse{


    String categoryName;


    BigDecimal spent;


}