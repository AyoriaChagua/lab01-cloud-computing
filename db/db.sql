CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE contacts (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    number VARCHAR(9) NOT NULL,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

