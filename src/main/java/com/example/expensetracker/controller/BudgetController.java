package com.example.expensetracker.controller;


import com.example.expensetracker.dto.budgetDto.BudgetRequest;
import com.example.expensetracker.dto.budgetDto.BudgetResponse;
import com.example.expensetracker.entity.Budget;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.BudgetService;
import com.example.expensetracker.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
@RequiredArgsConstructor
public class BudgetController {
    private  final SecurityUtil securityUtil;
    private final BudgetService budgetService;

    @PostMapping
    public ResponseEntity<BudgetResponse> createBudget(
            @Valid @RequestBody BudgetRequest budgetRequest
            , Authentication authentication) {
        User user = securityUtil.getCurrentUser(authentication);
        BudgetResponse response = budgetService.createBudget(budgetRequest, user);
        return ResponseEntity.
                status(HttpStatus.CREATED).body(response);

    }
    @GetMapping
    public ResponseEntity<List<BudgetResponse>> getAllBudgets(Authentication authentication) {
        User user = securityUtil.getCurrentUser(authentication);
        List<BudgetResponse> responses =budgetService.getBudgets(user);
        return ResponseEntity.ok(responses);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id, Authentication authentication) {
        User user = securityUtil.getCurrentUser(authentication);
        budgetService.deleteBudget(id, user);
        return  ResponseEntity
                .noContent()
                .build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<BudgetResponse> updateBudget(  @PathVariable Long id,

                                                         @RequestBody

                                                         @Valid BudgetRequest request
    , Authentication authentication) {
        User user = securityUtil.getCurrentUser(authentication);
      BudgetResponse response =  budgetService.updateBudget(id, request, user);
        return ResponseEntity
                .ok(response);
    }
}
