-- Keep track of sql command for setup

-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     fullname VARCHAR(255) NOT NULL
-- );

-- ALTER TABLE users ADD COLUMN img VARCHAR(255); 

-- used to grab user from google login
-- ALTER TABLE users ADD COLUMN google_id VARCHAR(255); 

-- make column unique
-- ALTER TABLE users ADD CONSTRAINT unique_google_id UNIQUE (google_id);

CREATE DATABASE twitter_clone;

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

-- Comments not implemented in order to keep project small
-- CREATE TABLE comments (
--     id SERIAL PRIMARY KEY,
--     post_id INT REFERENCES posts(id) NOT NULL,
--     comment_author INT REFERENCES users(id) NOT NULL,
--     body VARCHAR(255) NOT NULL
-- );

-- new post 
INSERT INTO posts (post_author, body) VALUES(userid, bodyofpost);

-- get feed 
SELECT u.fullname, u.img, p.body 
FROM users u INNER JOIN posts p ON u.id = p.post_author;

-- get posts user has posted
SELECT u.fullname, u.img, p.body 
FROM users u INNER JOIN posts p ON u.id = p.post_author
WHERE p.post_author = {userid};