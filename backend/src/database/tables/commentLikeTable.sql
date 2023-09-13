CREATE TABLE commentLikeTable
(
    comment_id VARCHAR(255),
    user_id VARCHAR(255),
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES commentTable(comment_id),
    FOREIGN KEY (user_id) REFERENCES userTable(id)
);


DELETE FROM commentLikeTable;