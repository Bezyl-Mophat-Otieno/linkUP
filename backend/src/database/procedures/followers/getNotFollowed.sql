CREATE OR ALTER PROCEDURE getNotFollowed
@user_id VARCHAR(255)
AS BEGIN
    SELECT userTable.username,userTable.id

    FROM userTable
    WHERE userTable.id NOT IN (
        SELECT followed
        FROM followerTable
        WHERE follower = @user_id
    )AND userTable.id <> @user_id; -- Exclude your own ID
END
