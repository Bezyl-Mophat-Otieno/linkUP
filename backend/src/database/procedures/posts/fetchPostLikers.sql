
CREATE OR ALTER PROCEDURE fetchPostLikers
    @post_id VARCHAR(255)
    AS BEGIN
        SELECT userTable.username, userTable.profile, userTable.id
        FROM postLikeTable
        INNER JOIN userTable
        ON postLikeTable.user_id = userTable.id
        WHERE postLikeTable.post_id = @post_id;
    END;
