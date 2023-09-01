CREATE OR ALTER PROCEDURE followUser
@id VARCHAR(255),
@follower VARCHAR(255),
@follow VARCHAR(255)

AS BEGIN
    INSERT INTO followerTable (id, follower, followed)
    VALUES (@id, @follower, @followed)
END
