CREATE OR ALTER PROCEDURE getPost
    @post_id VARCHAR(255)
    AS BEGIN
    SELECT postTable.post_id,postTable.user_id,postTable.content,postTable.image, postTable.likes, postTable.video ,userTable.username FROM postTable INNER JOIN userTable on postTable.user_id = userTable.id WHERE postTable.post_id = @post_id;
    END;