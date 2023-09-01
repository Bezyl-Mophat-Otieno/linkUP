CREATE OR ALTER PROCEDURE deleteComment
    @comment_id VARCHAR(255)
    AS BEGIN
        DELETE FROM commentTable WHERE comment_id = @comment_id;
    END;
