package com.example.expensetracker.controller;

import com.example.expensetracker.dto.analyticsDto.CategoryBreakdownResponse;
import com.example.expensetracker.dto.analyticsDto.DashboardResponse;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.AnalyticsService;
import com.example.expensetracker.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final SecurityUtil securityUtil;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(

            @RequestParam Month month,

            @RequestParam Integer year,

            Authentication authentication

    ){

        User user =
                securityUtil.getCurrentUser(authentication);


        DashboardResponse response =

                analyticsService.getDashboard(

                        user,

                        month,

                        year

                );


        return ResponseEntity.ok(response);

    }

    @GetMapping("/breakdown")
    public ResponseEntity<List<CategoryBreakdownResponse>>

    getBreakdown(

            @RequestParam Month month,

            @RequestParam Integer year,

            Authentication authentication

    ){


        User user =

                securityUtil.getCurrentUser(

                        authentication

                );



        List<CategoryBreakdownResponse>

                responses =


                analyticsService.getBreakdown(

                        user,

                        month,

                        year

                );



        return ResponseEntity.ok(

                responses

        );


    }


}