CREATE OR ALTER PROCEDURE getPost
    @post_id VARCHAR(255)
    AS BEGIN
    SELECT * FROM postTable WHERE post_id = @post_id;
    END;