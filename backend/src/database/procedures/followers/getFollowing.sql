CREATE OR ALTER PROCEDURE getFollowing
@user_id VARCHAR(255)
AS BEGIN
    SELECT userTable.username, userTable.id, followerTable.id AS followTableId
    FROM userTable
    INNER JOIN followerTable ON userTable.id = followerTable.followed
    WHERE followerTable.follower = @user_id;
END;
