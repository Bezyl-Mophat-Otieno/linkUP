CREATE OR ALTER PROCEDURE addSubComment
    @comment VARCHAR(255),
    @subComment_id VARCHAR(255)
    AS BEGIN
        INSERT INTO subCommentTable (comment,subComment_id)
        VALUES (@comment,@subcomment_id);
        UPDATE commentTable SET subcomment = 1 WHERE comment_id = @comment;


    END;
