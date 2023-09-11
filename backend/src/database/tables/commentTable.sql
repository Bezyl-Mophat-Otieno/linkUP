
CREATE TABLE commentTable (
    comment_id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255),
    user_id VARCHAR(255),
    content TEXT,
    likes INT DEFAULT 0,
    subcomment BIT DEFAULT 0,
    subcomment_id VARCHAR (255) DEFAULT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    -- Other comment-related fields
    FOREIGN KEY (post_id) REFERENCES postTable(post_id),
    FOREIGN KEY (user_id) REFERENCES userTable(id)
);

