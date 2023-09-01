CREATE OR ALTER PROCEDURE updateProduct
    @id varchar(255),
    @name varchar(250) = NULL,
    @description varchar(500) = NULL,
    @price decimal(10,2) = NULL,
    @quantity INT = NULL,
    @image varchar(300) = NULL
    AS BEGIN
    UPDATE productTable
    SET
        name = COALESCE(@name, name),
        description = COALESCE(@description, description),
        quantity = COALESCE(@quantity, quantity),
        price = COALESCE(@price, price),
        image = COALESCE(@image, image)
    WHERE id = @id
END