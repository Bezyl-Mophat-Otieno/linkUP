CREATE OR ALTER PROCEDURE getFollowing
@username VARCHAR(255)
AS BEGIN
    SELECT followed FROM followerTable WHERE follower = @username
END
