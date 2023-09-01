CREATE OR ALTER PROCEDURE deletePost
    @post_id VARCHAR(255)
    AS BEGIN
    DELETE FROM postTable WHERE post_id = @post_id;
    END;