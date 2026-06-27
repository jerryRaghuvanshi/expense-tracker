package com.example.expensetracker.service;

import com.example.expensetracker.dto.categoryDto.CategoryRequest;
import com.example.expensetracker.dto.categoryDto.CategoryResponse;
import com.example.expensetracker.entity.User;

import java.util.List;

public interface CategoryService {


    CategoryResponse createCategory(

            CategoryRequest request,

            User user

    );



    List<CategoryResponse> getCategories(

            User user

    );



    void deleteCategory(

            Long id,

            User user

    );



    CategoryResponse updateCategory(

            Long id,

            CategoryRequest request,

            User user

    );


}