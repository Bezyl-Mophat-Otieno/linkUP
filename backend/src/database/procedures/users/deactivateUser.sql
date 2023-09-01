CREATE OR ALTER PROCEDURE deactivateUser
    @id VARCHAR(250)
AS  
BEGIN
    UPDATE userTable
    SET deleted = 1
    WHERE id = @id
END