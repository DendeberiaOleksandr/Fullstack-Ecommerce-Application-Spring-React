package com.ecommerce.ecommerceapi.endpoints.products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDto {

    private String name;

    private Long price;

    private byte[] image;

    private Integer categoryId;

}
