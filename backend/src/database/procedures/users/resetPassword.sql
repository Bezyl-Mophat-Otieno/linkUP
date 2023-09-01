CREATE OR ALTER PROCEDURE resetPassword

    @username VARCHAR(250),
    @password VARCHAR(250)

  AS BEGIN 
    
        UPDATE userTable
        SET password = @password
        WHERE username = @username
    
    END