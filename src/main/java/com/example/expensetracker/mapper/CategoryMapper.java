package com.example.expensetracker.mapper;

import com.example.expensetracker.dto.categoryDto.CategoryRequest;
import com.example.expensetracker.dto.categoryDto.CategoryResponse;
import com.example.expensetracker.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(
        componentModel = "spring"
)
public interface CategoryMapper {
    CategoryResponse toResponse(
            Category category
    );

    Category toEntity(

            CategoryRequest request

    );
    List<CategoryResponse>

    toResponseList(

            List<Category> categories

    );
    void updateCategory(

            CategoryRequest request,

            @MappingTarget

            Category category

    );


}