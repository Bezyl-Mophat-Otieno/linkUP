CREATE OR ALTER PROCEDURE getFollowers
@username VARCHAR(255)
AS BEGIN
    SELECT follower FROM followerTable WHERE followed = @username
END
