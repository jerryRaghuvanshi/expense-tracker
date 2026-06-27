package com.example.expensetracker;

import com.example.expensetracker.dto.categoryDto.CategoryRequest;
import com.example.expensetracker.dto.categoryDto.CategoryResponse;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.mapper.CategoryMapper;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.service.impl.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {
    @Mock
    private CategoryRepository repository;

    @Mock
    private CategoryMapper mapper;
    @InjectMocks
    private CategoryServiceImpl service;
    @Test
    void shouldCreateCategorySuccessfully(){
        User user = new User();


        CategoryRequest request =
                new CategoryRequest();

        request.setName("Food");

        Category category =
                new Category();

        category.setName("Food");

        CategoryResponse response =
                new CategoryResponse();

        response.setName("Food");

        when(

                repository.existsByNameAndUser(

                        "Food",

                        user

                )

        )

                .thenReturn(

                        false

                );

        when(

                mapper.toEntity(

                        request

                )

        )

                .thenReturn(

                        category

                );

        when(

                mapper.toResponse(

                        category

                )

        )

                .thenReturn(

                        response

                );

        CategoryResponse result =

                service.createCategory(

                        request,

                        user

                );
        assertEquals(

                "Food",

                result.getName()

        );

        verify(

                repository

        )

                .save(

                        category

                );

    }



}
