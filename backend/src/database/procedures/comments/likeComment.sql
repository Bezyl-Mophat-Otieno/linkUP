CREATE OR ALTER PROCEDURE likeComment
    @comment_id VARCHAR(255),
    @user_id VARCHAR(255)
    AS BEGIN
        INSERT INTO commentLikeTable (comment_id, user_id) VALUES (@comment_id, @user_id);
        UPDATE commentTable SET likes = likes + 1 WHERE comment_id = @comment_id;
    END;
