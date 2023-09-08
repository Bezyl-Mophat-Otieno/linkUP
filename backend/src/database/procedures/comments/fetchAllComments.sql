CREATE OR ALTER PROCEDURE allComments 
    AS BEGIN
        SELECT commentTable.post_id,commentTable.user_id,commentTable.likes,commentTable.subcomment,commentTable.content , userTable.username FROM commentTable INNER JOIN userTable ON commentTable.user_id = userTable.id;
    END;
