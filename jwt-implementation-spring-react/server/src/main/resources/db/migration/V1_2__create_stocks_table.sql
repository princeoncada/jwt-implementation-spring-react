CREATE TABLE tbl_stocks(
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    ticker VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    stock_data MEDIUMTEXT NOT NULL,
    growth INT NOT NULL,
    dividend INT NOT NULL,
    value INT NOT NULL,
    total INT NOT NULL,
    expiry DATETIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);