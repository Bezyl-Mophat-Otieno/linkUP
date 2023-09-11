CREATE OR ALTER PROCEDURE fetchSubcomment
@comment_id VARCHAR(255)
AS BEGIN
    SELECT userTable.username, commentTable.user_id, commentTable.content
    FROM subCommentTable
    INNER JOIN commentTable ON subCommentTable.subcomment_id = commentTable.comment_id
    INNER JOIN userTable ON commentTable.user_id = userTable.id
    WHERE subCommentTable.comment = @comment_id;
END;
