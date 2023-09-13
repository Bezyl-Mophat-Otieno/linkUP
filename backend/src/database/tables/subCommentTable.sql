
CREATE TABLE subCommentTable (
    comment VARCHAR(255) PRIMARY KEY,
    subcomment_id VARCHAR (255) DEFAULT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

SELECT * FROM subCommentTable;

DELETE FROM subCommentTable;