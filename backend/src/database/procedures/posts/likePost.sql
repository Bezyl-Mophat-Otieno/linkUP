CREATE OR ALTER PROCEDURE likePost
    @post_id VARCHAR(255),
    @user_id VARCHAR(255)
    AS BEGIN
        INSERT INTO postLikeTable (post_id, user_id) VALUES (@post_id, @user_id);
        UPDATE postTable SET likes = likes + 1 WHERE post_id = @post_id;
    END;
