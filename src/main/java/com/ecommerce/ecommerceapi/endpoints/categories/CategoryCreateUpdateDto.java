package com.ecommerce.ecommerceapi.endpoints.categories;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreateUpdateDto {

    @Size(min = 1, max = 50)
    private String name;
}
