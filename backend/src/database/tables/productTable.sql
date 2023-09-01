   CREATE TABLE productTable (
        id VARCHAR(250) NOT NULL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        description VARCHAR(500) NOT NULL,
        image VARCHAR(300) NULL,
        price DECIMAL(10,2) NOT NULL,

    );

    ALTER TABLE productTable
    ADD quantity INT NULL;