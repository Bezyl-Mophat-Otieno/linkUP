CREATE OR ALTER PROCEDURE fetchCommentLikers
    @comment_id VARCHAR(255)
    AS BEGIN
        SELECT userTable.username, userTable.profile, userTable.id
        FROM commentLikeTable
        INNER JOIN userTable
        ON commentLikeTable.user_id = userTable.id
        WHERE commentLikeTable.comment_id = @comment_id;
    END;
