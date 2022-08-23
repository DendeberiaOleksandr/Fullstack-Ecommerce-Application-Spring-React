package com.ecommerce.ecommerceapi.service;

import com.ecommerce.ecommerceapi.domain.Image;
import com.ecommerce.ecommerceapi.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public Image findById(Long id) {
        return imageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Image with id: " + id + " not found!"));
    }

    public Image save(byte[] content){
        return imageRepository.save(new Image(null, content));
    }
}
