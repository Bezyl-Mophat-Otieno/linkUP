CREATE OR ALTER PROCEDURE addPost
    @post_id VARCHAR(255),
    @user_id VARCHAR(255),
    @content VARCHAR(255) = NULL,
    @image VARCHAR(255) = NULL,
    @video VARCHAR(255) = NULL
    AS BEGIN
    INSERT INTO postTable (post_id, user_id, content, image ,video)
    VALUES (@post_id, @user_id, @content, @image , @video);
    END;
