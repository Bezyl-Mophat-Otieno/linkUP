--  insert a user with the properties id , usernam , email , password
CREATE OR ALTER PROCEDURE addUser
    @id VARCHAR(250),
    @username VARCHAR(250),
    @email VARCHAR(500),
    @password VARCHAR(300)
    AS BEGIN 
    INSERT INTO userTable (id, username, email, password)
    VALUES (@id, @username, @email, @password)
END