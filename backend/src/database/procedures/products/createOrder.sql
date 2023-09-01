CREATE OR ALTER PROCEDURE createOrder
    @id VARCHAR(250),
    @user_id VARCHAR(300),
    @name VARCHAR(250),
    @price DECIMAL(10,2),
    @quantity INT,
    @total DECIMAL(10,2)
AS
BEGIN
        INSERT INTO orderTable (id, user_id ,name, price, quantity, total)
        VALUES (@id, @user_id,@name, @price, @quantity, @total);
END;