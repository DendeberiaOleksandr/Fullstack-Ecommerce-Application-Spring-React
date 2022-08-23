package com.ecommerce.ecommerceapi.endpoints.products;

import com.ecommerce.ecommerceapi.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Date;

@Data
@AllArgsConstructor
public class ProductGetDto {

    private Integer id;

    private String name;

    private Long price;

    private Category category;

    private String image;

    private Date createdAt;

}
