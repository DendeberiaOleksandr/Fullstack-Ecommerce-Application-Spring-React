package com.ecommerce.ecommerceapi.endpoints.products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductCreateDto {

    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    private Long price;

    @Size(min = 1)
    private byte[] image;

    @NotNull
    private Integer categoryId;

}
