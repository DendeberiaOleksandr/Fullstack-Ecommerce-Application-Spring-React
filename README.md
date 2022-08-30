# Fullstack-Ecommerce-Application-Spring-React
## Backend

### How to run
To compile use `mvn clean package`

### Domain

1. Category
   - __id__ Integer PRIMARY KEY
   - __name__ String(50) NOT NULL
   - __createdAt__ Date NOT NULL

2. Product
   - __id__ Integer PRIMARY KEY
   - __name__ String(100) NOT NULL
   - __price__ Long NOT NULL
   - __category__ Category
   - __image__ Image
   
3. Image
   - __id__ Long PK
   - __content__ byte[]

### Endpoints

| Name  | Method | Arguments |
| ------------- | ------------- | ------------- |
| /api/products  | GET  | int size, default = 2 <br /> int page, default = 0 <br /> String sort, default = "createdAt, desc" <br /> String filter, required = false|
| Content Cell  | Content Cell  |  |

### Filter And Sorting
Filter and sorting are provided using RSQL syntax. https://github.com/perplexhub/rsql-jpa-specification
