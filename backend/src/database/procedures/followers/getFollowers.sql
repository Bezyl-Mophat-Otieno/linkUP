CREATE OR ALTER PROCEDURE getFollowers
@user_id VARCHAR(255)
AS BEGIN
    SELECT userTable.username
    FROM userTable
    WHERE userTable.id IN (
        SELECT follower
        FROM followerTable
        WHERE followed = @user_id
    )
END