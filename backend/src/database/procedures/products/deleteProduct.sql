CREATE OR ALTER PROCEDURE deleteProduct
    @id varchar(255)
    AS BEGIN
    DELETE FROM productTable
    WHERE id = @id
END
