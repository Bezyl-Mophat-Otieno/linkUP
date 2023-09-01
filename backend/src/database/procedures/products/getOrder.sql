CREATE OR ALTER PROCEDURE getOrder
    @user_id VARCHAR(250)
    AS BEGIN
        SELECT * FROM orderTable WHERE user_Id = @user_id;
    END;