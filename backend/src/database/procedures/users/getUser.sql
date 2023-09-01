CREATE OR ALTER PROCEDURE getUser
    @email  VARCHAR(500)
AS BEGIN
    SELECT * FROM userTable WHERE email = @email
END
