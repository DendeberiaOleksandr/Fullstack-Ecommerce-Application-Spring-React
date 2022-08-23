package com.ecommerce.ecommerceapi.endpoints.categories;

import com.ecommerce.ecommerceapi.domain.Category;
import com.ecommerce.ecommerceapi.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

import static com.ecommerce.ecommerceapi.constants.Api.PREFIX;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(PREFIX + "/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<Category> getAll(){
        log.info("GET: /categories");
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id){
        try {
            log.info("GET: /categories/id:{}", id);
            return ResponseEntity.ok(categoryService.findById(id));
        } catch (EntityNotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CategoryCreateUpdateDto dto){
        try {
            log.info("POST: /categories");
            return ResponseEntity.ok(categoryService.save(dto));
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(){
        try {
            log.info("DELETE: /categories");
            categoryService.deleteAll();
            return ResponseEntity.ok().build();
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id){
        try {
            log.info("DELETE: /categories/id:{}", id);
            categoryService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody CategoryCreateUpdateDto dto){
        try {
            log.info("PATCH: /categories/id:{}", id);
            return ResponseEntity.ok(categoryService.update(id, dto));
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }


}
