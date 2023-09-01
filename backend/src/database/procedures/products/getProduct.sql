CREATE OR ALTER PROCEDURE getProduct
    @id varchar(255)
    AS BEGIN
    SELECT * FROM productTable
    WHERE id = @id
END
