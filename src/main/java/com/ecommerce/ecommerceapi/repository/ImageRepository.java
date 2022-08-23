package com.ecommerce.ecommerceapi.repository;

import com.ecommerce.ecommerceapi.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
