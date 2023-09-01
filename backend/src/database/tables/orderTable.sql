

-- For the name i'm referring to the name of the product

    CREATE TABLE orderTable (
        id VARCHAR(250) NOT NULL PRIMARY KEY,
        user_id VARCHAR(250) NOT NULL,
        name VARCHAR(250) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    );
    
