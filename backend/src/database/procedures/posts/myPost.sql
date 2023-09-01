CREATE OR ALTER PROCEDURE myPosts
    @user_id VARCHAR(255)
    AS BEGIN
    SELECT * FROM postTable WHERE user_id = @user_id;
    END;