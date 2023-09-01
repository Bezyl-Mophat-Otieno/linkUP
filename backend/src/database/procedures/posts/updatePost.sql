CREATE OR ALTER PROCEDURE updatePost
    @post_id VARCHAR(255),
    @content VARCHAR(255) = NULL,
    @image VARCHAR(255) = NULL
    AS BEGIN
    UPDATE postTable
    SET content = COALESCE(@content,content), image = COALESCE(@image,image)
    WHERE post_id = @post_id;
    END;
