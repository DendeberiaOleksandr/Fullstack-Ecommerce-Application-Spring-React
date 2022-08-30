package com.ecommerce.ecommerceapi.endpoints.products;

import com.ecommerce.ecommerceapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import static com.ecommerce.ecommerceapi.constants.Api.PREFIX;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(PREFIX + "/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Page<ProductGetDto> getAll(
            @RequestParam(defaultValue = "2") int size,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "createdAt,desc") String sort,
            @RequestParam(required = false) String filter
    ){
        log.info("GET: /products size:{}, page:{}, sort:{}, filter:{}", size, page, sort, filter);
        return productService.findAll(size, page, sort, filter)
                .map(productService::convertToDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id){
        try {
            log.info("GET: /products/id:{}", id);
            return ResponseEntity.ok(productService.convertToDto(productService.findById(id)));
        } catch (EntityNotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody ProductCreateDto dto){
        try {
            log.info("POST: /products");
            return ResponseEntity.ok(productService.convertToDto(productService.save(dto)));
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,
                                    @Valid @RequestBody ProductUpdateDto dto){
        try {
            log.info("PATCH: /products/id:{}", id);
            return ResponseEntity.ok(productService.convertToDto(productService.update(id, dto)));
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(){
        try {
            log.info("DELETE: /products");
            productService.deleteAll();
            return ResponseEntity.ok().build();
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id){
        try {
            log.info("DELETE: /products/id:{}", id);
            productService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

}
