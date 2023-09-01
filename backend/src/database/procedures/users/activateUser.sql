CREATE OR ALTER PROCEDURE activateUser
    @id VARCHAR(250)
AS  
BEGIN
    UPDATE userTable
    SET deleted = 0
    WHERE id = @id
END