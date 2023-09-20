CREATE OR ALTER PROCEDURE getComment
@comment_id VARCHAR(250)
AS BEGIN
        SELECT commentTable.comment_id,commentTable.post_id,commentTable.user_id,commentTable.likes,commentTable.subcomment,commentTable.content , userTable.username FROM commentTable INNER JOIN userTable ON commentTable.user_id = userTable.id
        WHERE commentTable.comment_id = @comment_id;
END;