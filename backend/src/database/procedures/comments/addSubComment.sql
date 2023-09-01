CREATE OR ALTER PROCEDURE addSubComment
    @comment_id VARCHAR(255),
    @status BIT
    AS BEGIN
        UPDATE commentTable SET subcomment = @status WHERE comment_id = @comment_id;
    END;