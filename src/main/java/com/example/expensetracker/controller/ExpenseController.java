package com.example.expensetracker.controller;

import com.example.expensetracker.dto.categoryDto.CategoryRequest;
import com.example.expensetracker.dto.expenseDto.ExpenseRequest;
import com.example.expensetracker.dto.expenseDto.ExpenseResponse;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.CsvService;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.service.UserService;
import com.example.expensetracker.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.time.Month;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final SecurityUtil securityUtil;
    private final ExpenseService expenseService;
    private  final CsvService csvService;

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(@Valid @RequestBody ExpenseRequest request ,
             Authentication authentication) {
        User user =
                securityUtil.getCurrentUser(authentication);
        ExpenseResponse response = expenseService.createExpense(request,user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
    @GetMapping
    public ResponseEntity<Page<ExpenseResponse>>

    getAllExpenses(


            @RequestParam(

                    required=false

            )

            Long categoryId,
            @RequestParam(required = false) String keyword,


            @RequestParam(

                    required=false

            )

            Month month,



            @RequestParam(

                    required=false

            )

            Integer year,



            Pageable pageable,



            Authentication authentication


    ) {
        User user =
                securityUtil.getCurrentUser(authentication);

        Page<ExpenseResponse>

                response =



                expenseService.getExpenses(

                        user,

                        categoryId,
                        keyword,


                        month,

                        year,

                        pageable

                );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(  @PathVariable Long id,

                                                Authentication authentication){
        User user =
                securityUtil.getCurrentUser(authentication);
        expenseService.deleteExpense(id, user);
        return ResponseEntity

                .noContent()

                .build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(@PathVariable Long id,

                                                         @RequestBody

                                                         @Valid

                                                         ExpenseRequest request,

                                                         Authentication authentication){
        User user =
                securityUtil.getCurrentUser(authentication);
        ExpenseResponse response = expenseService.updateExpense(id, request,user);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
    @GetMapping("/export")
    public ResponseEntity<InputStreamResource>

    export(

            Authentication authentication

    ){

        User user = securityUtil.getCurrentUser(authentication);
        ByteArrayInputStream csv = csvService.exportExpenses(user);

        HttpHeaders headers = new HttpHeaders();
        headers.add( HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=expenses.csv"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(csv)
                );

    }
}
