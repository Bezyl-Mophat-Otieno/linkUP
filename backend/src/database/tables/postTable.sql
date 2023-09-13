CREATE TABLE postTable (
    post_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    content VARCHAR(255) NULL,
    likes INT DEFAULT 0,
    image VARCHAR(255) NULL,
    video VARCHAR(255) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE postTable ADD video VARCHAR(255) NULL;

DELETE from postTable;