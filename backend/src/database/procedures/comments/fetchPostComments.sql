CREATE OR ALTER PROCEDURE postComments
    @post_id VARCHAR(255)
    AS BEGIN
        SELECT * FROM commentTable WHERE post_id = @post_id;
    END;
