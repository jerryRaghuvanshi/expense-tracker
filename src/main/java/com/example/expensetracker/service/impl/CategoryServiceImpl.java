package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.categoryDto.CategoryRequest;
import com.example.expensetracker.dto.categoryDto.CategoryResponse;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.execptions.CategoryAlreadyExistsException;
import com.example.expensetracker.execptions.CategoryNotFoundException;
import com.example.expensetracker.mapper.CategoryMapper;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper mapper;

    @Override
    public CategoryResponse createCategory(CategoryRequest request, User user) {
        if(categoryRepository.existsByNameAndUser(
                request.getName(),
                user
        )){

            throw new CategoryAlreadyExistsException(
                    "Category already exists"
            );

        }

        Category category =

                mapper.toEntity(
                        request
                );


        category.setUser(user);
        categoryRepository.save(category);

        return mapper.toResponse(

                category

        );
    }

    @Override
    public List<CategoryResponse> getCategories(User user) {
        List<Category> categories =

                categoryRepository.findByUser(

                        user

                );

        return mapper.toResponseList(

                categories

        );
    }

    @Override
    public void deleteCategory(Long id, User user) {
        Category category =

                categoryRepository

                        .findByIdAndUser(

                                id,

                                user

                        )


                        .orElseThrow(

                                ()->new CategoryNotFoundException(

                                        "Category not found"

                                )

                        );
        categoryRepository.delete(

                category
        );

    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request, User user) {
        Category category =

                categoryRepository

                        .findByIdAndUser(

                                id,

                                user

                        )


                        .orElseThrow(

                                ()->new CategoryNotFoundException(

                                        "Category not found"

                                )

                        );


        if(categoryRepository.existsByNameAndUser(
                request.getName(),
                user
        ) && !category.getName().equals(request.getName())) {

            throw new CategoryAlreadyExistsException(
                    "Category already exists"
            );
        }

        mapper.updateCategory(request, category);

        return mapper.toResponse(category);
    }
}
