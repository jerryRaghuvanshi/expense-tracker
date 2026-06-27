package com.example.expensetracker.controller;

import com.example.expensetracker.dto.categoryDto.CategoryRequest;
import com.example.expensetracker.dto.categoryDto.CategoryResponse;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.CategoryService;
import com.example.expensetracker.service.UserService;
import com.example.expensetracker.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final SecurityUtil securityUtil;

    private final CategoryService categoryService;


    @PostMapping
    public ResponseEntity<CategoryResponse>

    createCategory(

            @Valid
            @RequestBody
            CategoryRequest request,

            Authentication authentication

    ){

        User user =
                securityUtil.getCurrentUser(authentication);

        CategoryResponse response =

                categoryService.createCategory(

                        request,

                        user

                );
        return ResponseEntity

                .status(HttpStatus.CREATED)

                .body(response);

    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>>

    getCategories(

            Authentication authentication

    ){

        User user =
                securityUtil.getCurrentUser(authentication);

        List<CategoryResponse> response =

                categoryService.getCategories(

                        user

                );

        return ResponseEntity.ok(

                response

        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>

    deleteCategory(

            @PathVariable Long id,

            Authentication authentication

    ){

        User user =
                securityUtil.getCurrentUser(authentication);

        categoryService.deleteCategory(

                id,

                user

        );
        return ResponseEntity

                .noContent()

                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse>

    updateCategory(

            @PathVariable Long id,

            @RequestBody

            @Valid

            CategoryRequest request,

            Authentication authentication

    ){
        User user =
                securityUtil.getCurrentUser(authentication);

        CategoryResponse response = categoryService.updateCategory(id ,request,user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);


    }

}
