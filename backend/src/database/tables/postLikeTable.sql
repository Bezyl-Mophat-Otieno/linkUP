CREATE TABLE postLikeTable 
(
    post_id VARCHAR(255),
    user_id VARCHAR(255),
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES postTable(post_id),
    FOREIGN KEY (user_id) REFERENCES userTable(id)
);

SELECT * FROM postLikeTable;