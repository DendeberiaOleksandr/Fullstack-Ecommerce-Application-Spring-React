package com.ecommerce.ecommerceapi.service;

import com.ecommerce.ecommerceapi.domain.Category;
import com.ecommerce.ecommerceapi.domain.Image;
import com.ecommerce.ecommerceapi.domain.Product;
import com.ecommerce.ecommerceapi.endpoints.products.ProductCreateDto;
import com.ecommerce.ecommerceapi.endpoints.products.ProductGetDto;
import com.ecommerce.ecommerceapi.endpoints.products.ProductUpdateDto;
import com.ecommerce.ecommerceapi.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletContext;
import java.util.Date;
import java.util.List;

import static com.ecommerce.ecommerceapi.constants.Api.PREFIX;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final ServletContext servletContext;
    private final ImageService imageService;

    public ProductGetDto convertToDto(Product product){
        return new ProductGetDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getCategory(),
                servletContext.getContextPath() + PREFIX + "/images/" + product.getImage().getId(),
                product.getCreatedAt()
        );
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id: " + id + " not found!"));
    }

    public Product save(ProductCreateDto dto) {
        Category category = categoryService.findById(dto.getCategoryId());
        Image image = imageService.save(dto.getImage());

        return productRepository.save(new Product(
                null,
                dto.getName(),
                dto.getPrice(),
                category,
                image,
                new Date()
        ));
    }

    public Product update(Integer id, ProductUpdateDto dto) {
        Product existedProduct = findById(id);

        if (dto.getCategoryId() != null){
            Category category = categoryService.findById(dto.getCategoryId());
            existedProduct.setCategory(category);
        }

        if (dto.getName() != null){
            existedProduct.setName(dto.getName());
        }

        if (dto.getPrice() != null){
            existedProduct.setPrice(dto.getPrice());
        }

        if (dto.getImage().length > 0){
            existedProduct.getImage().setContent(dto.getImage());
        }

        return productRepository.save(existedProduct);
    }

    public void deleteAll() {
        productRepository.deleteAll();
    }

    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }
}
