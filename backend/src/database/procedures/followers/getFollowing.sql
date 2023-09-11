
CREATE OR ALTER PROCEDURE getFollowing
@user_id VARCHAR(255)
AS BEGIN
    SELECT userTable.username
    FROM userTable
    WHERE userTable.id IN (
        SELECT followed
        FROM followerTable
        WHERE follower = @user_id
    )
END
