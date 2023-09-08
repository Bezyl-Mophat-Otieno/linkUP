CREATE OR ALTER PROCEDURE postComments
    @post_id VARCHAR(255)
    AS BEGIN
                SELECT commentTable.user_id,commentTable.likes,commentTable.subcomment,commentTable.content , userTable.username FROM commentTable INNER JOIN userTable ON commentTable.user_id = userTable.id WHERE post_id = @post_id;
    END;
