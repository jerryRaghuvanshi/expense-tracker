package com.example.expensetracker.dto.categoryDto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {

    Long id;

    String name;
}
