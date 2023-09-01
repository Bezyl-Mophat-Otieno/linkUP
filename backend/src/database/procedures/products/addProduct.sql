CREATE OR ALTER PROCEDURE addProduct
    @id VARCHAR(250),
    @name VARCHAR(250),
    @description VARCHAR(500),
    @image VARCHAR(300) = NULL,
    @quantity INT = NULL,
    @price DECIMAL(10,2)
    AS BEGIN 
    INSERT INTO productTable (id, name, description, image,quantity,price)
    VALUES (
        @id,
        @name,
        @description,
        @image,
        @quantity,
        @price    
        )
END