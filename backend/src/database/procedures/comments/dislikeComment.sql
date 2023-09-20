CREATE OR ALTER PROCEDURE dislikeComment
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255)
AS BEGIN
    -- Delete the existing like if it exists (optional)
    DELETE FROM commentLikeTable WHERE comment_id = @comment_id AND user_id = @user_id;

    -- Decrement the likes count
    UPDATE commentTable SET likes = 
    CASE 
    WHEN likes > 0 THEN likes - 1 ELSE 0
    END 
    WHERE comment_id = @comment_id;
END;
