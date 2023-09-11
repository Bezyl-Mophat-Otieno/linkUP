CREATE TABLE followerTable

(   id VARCHAR(255) NOT NULL,
    follower VARCHAR(255) NOT NULL,
    followed VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower) REFERENCES userTable (id),
    FOREIGN KEY (followed) REFERENCES userTable (id),
);

-- DROP TABLE followerTable;
