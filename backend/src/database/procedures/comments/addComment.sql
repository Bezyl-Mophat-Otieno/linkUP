CREATE OR ALTER PROCEDURE addComment
    @comment_id VARCHAR(255),
    @post_id VARCHAR(255),
    @user_id VARCHAR(255),
    @content TEXT
    AS BEGIN
        INSERT INTO commentTable (comment_id, post_id, user_id, content)
        VALUES (@comment_id, @post_id, @user_id, @content);
    END;

