CREATE OR ALTER PROCEDURE dislikePost
    @post_id VARCHAR(255),
    @user_id VARCHAR(255)
AS BEGIN
    -- Delete the existing like if it exists (optional)
    DELETE FROM postLikeTable WHERE post_id = @post_id AND user_id = @user_id;

    -- Decrement the likes count
    UPDATE postTable SET likes = 
    CASE 
    WHEN likes > 0 THEN likes - 1 ELSE 0
    END 
    WHERE post_id = @post_id;
    UPDATE postTable SET likeState = 0 WHERE post_id = @post_id;
END;
