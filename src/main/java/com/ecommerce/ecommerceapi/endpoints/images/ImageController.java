package com.ecommerce.ecommerceapi.endpoints.images;

import com.ecommerce.ecommerceapi.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static com.ecommerce.ecommerceapi.constants.Api.PREFIX;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(PREFIX + "/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public Resource getById(@PathVariable Long id){
        return new ByteArrayResource(imageService.findById(id).getContent());
    }

}
