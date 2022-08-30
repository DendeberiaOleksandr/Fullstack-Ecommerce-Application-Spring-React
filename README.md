# Fullstack-Ecommerce-Application-Spring-React
## Backend

### How to run
To compile use `mvn clean package`

### Domain

1. Category
   - id INT PRIMARY KEY
   - name VARCHAR(50) NOT NULL
   - createdAt DATETIME NOT NULL

2. Product
   - id INT PRIMARY KEY
   - name VARCHAR(100) NOT NULL
   - price BIGINT NOT NULL
   - category Category
   - image Image
   
3. Image
   - id BIGINT PRIMARY KEY
   - content LONGBLOB
