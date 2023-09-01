CREATE OR ALTER PROCEDURE myComments
    @user_id VARCHAR(255)
    AS BEGIN
        SELECT * FROM commentTable WHERE user_id = @user_id;
    END;