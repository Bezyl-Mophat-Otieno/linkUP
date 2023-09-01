CREATE OR ALTER PROCEDURE updateComment
    @comment_id VARCHAR(255),
    @content TEXT,
    @subcomment BIT = 0
    AS BEGIN
        UPDATE commentTable SET content = @content WHERE comment_id = @comment_id;
    END;