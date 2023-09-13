CREATE OR ALTER PROCEDURE getFollowers
@user_id VARCHAR(255)
AS BEGIN
    SELECT userTable.username, userTable.id, followerTable.id AS followTableId
    FROM userTable
    INNER JOIN followerTable ON userTable.id = followerTable.follower
    WHERE followerTable.followed = @user_id;
END;
