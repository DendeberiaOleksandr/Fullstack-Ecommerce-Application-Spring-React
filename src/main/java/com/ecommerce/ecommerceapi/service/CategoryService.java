package com.ecommerce.ecommerceapi.service;

import com.ecommerce.ecommerceapi.domain.Category;
import com.ecommerce.ecommerceapi.endpoints.categories.CategoryCreateUpdateDto;
import com.ecommerce.ecommerceapi.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;


    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Integer id) {
        return categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category with id: " + id + " not found!"));
    }

    public Category save(CategoryCreateUpdateDto dto) {
        return categoryRepository.save(new Category(
                null,
                dto.getName(),
                new Date()
        ));
    }

    public void deleteAll() {
        categoryRepository.deleteAll();
    }

    public void deleteById(Integer id) {
        categoryRepository.deleteById(id);
    }


    public Category update(Integer id, CategoryCreateUpdateDto dto) {
        Category existed = findById(id);
        existed.setName(dto.getName());
        return categoryRepository.save(existed);
    }
}
