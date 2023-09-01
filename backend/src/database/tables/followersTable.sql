CREATE TABLE followerTable

(   id VARCHAR(255) NOT NULL,
    follower VARCHAR(255) NOT NULL,
    followed VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower) REFERENCES userTable (username),
    FOREIGN KEY (followed) REFERENCES userTable (username),
);

DROP TABLE followerTable;
