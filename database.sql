-- Keep track of sql command for setup

CREATE DATABASE twitter_clone;

-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     fullname VARCHAR(255) NOT NULL
-- );

-- ALTER TABLE users ADD COLUMN img VARCHAR(255); 

-- used to grab user from google login
-- ALTER TABLE users ADD COLUMN google_id VARCHAR(255); 

-- make column unique
-- ALTER TABLE users ADD CONSTRAINT unique_google_id UNIQUE (google_id);

-- better table to keep it simple 
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    fullname VARCHAR(255) NOT NULL,
    img VARCHAR(255),
    google_id VARCHAR(255) UNIQUE 
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    post_author INT REFERENCES users(id) NOT NULL,
    body VARCHAR(255) NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) NOT NULL,
    comment_author INT REFERENCES users(id) NOT NULL,
    body VARCHAR(255) NOT NULL
);

-- new post 
INSERT INTO posts (post_author, body) VALUES(userid, bodyofpost);

-- get feed 
SELECT u.fullname, p.body 
FROM users u INNER JOIN posts p on u.id = p.post_author;