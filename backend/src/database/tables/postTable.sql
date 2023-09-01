CREATE TABLE postTable (
    post_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    content VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


