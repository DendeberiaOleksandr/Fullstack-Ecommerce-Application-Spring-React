package com.ecommerce.ecommerceapi.service;

import com.ecommerce.ecommerceapi.domain.Category;
import com.ecommerce.ecommerceapi.domain.Image;
import com.ecommerce.ecommerceapi.domain.Product;
import com.ecommerce.ecommerceapi.endpoints.products.ProductCreateDto;
import com.ecommerce.ecommerceapi.endpoints.products.ProductGetDto;
import com.ecommerce.ecommerceapi.endpoints.products.ProductUpdateDto;
import com.ecommerce.ecommerceapi.repository.ProductRepository;
import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletContext;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;

import static com.ecommerce.ecommerceapi.constants.Api.PREFIX;

@Service
@RequiredArgsConstructor
public class ProductService {

    @Value("${server.port}")
    private String serverPort;

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final ServletContext servletContext;
    private final ImageService imageService;

    public ProductGetDto convertToDto(Product product){
        String serverAddress = InetAddress.getLoopbackAddress().getHostAddress();
        String imageUrl = "http://" + serverAddress + ":" + serverPort + PREFIX + "/images/" + product.getImage().getId();

        return new ProductGetDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getCategory(),
                imageUrl,
                product.getCreatedAt()
        );
    }

    public Page<Product> findAll(int size, int page, String sort, String filter) {
        Specification<Product> productSpecification = RSQLJPASupport.toSort(sort);

        if (filter != null){
            productSpecification = productSpecification.and(RSQLJPASupport.toSpecification(filter));
        }

        return productRepository.findAll(productSpecification, PageRequest.of(page, size));
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

        if (dto.getName() != null && !dto.getName().isEmpty() && dto.getName().length() < 100){
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
