CREATE OR ALTER PROCEDURE followedPosts
    @user_id VARCHAR(255)
    AS BEGIN
    SELECT postTable.post_id,postTable.image, postTable.video ,postTable.content , userTable.username , postTable.likes , postTable.likeState FROM postTable INNER JOIN userTable ON postTable.user_id = userTable.id INNER JOIN followerTable ON userTable.id = followerTable.followed WHERE follower = @user_id  ;
    END;
