CREATE OR ALTER PROCEDURE allPosts
    AS BEGIN
    SELECT  postTable.post_id,postTable.image,postTable.video,postTable.content,postTable.likes ,postTable.likeState , userTable.username FROM postTable INNER JOIN userTable ON postTable.user_id = userTable.id;
    END;
