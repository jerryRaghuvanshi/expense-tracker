package com.example.expensetracker.service;

import com.example.expensetracker.dto.analyticsDto.CategoryBreakdownResponse;
import com.example.expensetracker.dto.analyticsDto.DashboardResponse;
import com.example.expensetracker.entity.User;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;

public interface AnalyticsService {
    DashboardResponse getDashboard(

            User user,

            Month month,

            Integer year

    );



    List<CategoryBreakdownResponse>

    getBreakdown(

            User user,

            Month month,

            Integer year

    );

}
