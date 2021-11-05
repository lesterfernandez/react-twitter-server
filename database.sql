-- Keep track of sql command for setup

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

-- new post 
INSERT INTO posts (post_author, body) VALUES(userid, bodyofpost);

-- get feed
SELECT u.fullname, u.img, p.body FROM users u INNER JOIN posts p on u.id = p.post_author 
ORDER BY p.id DESC LIMIT 5 OFFSET {nextMin};

-- get posts user has posted
SELECT u.fullname, u.img, p.body 
FROM users u INNER JOIN posts p on u.id = p.post_author 
WHERE p.post_author = {userid} 
ORDER BY p.id DESC LIMIT 5 OFFSET {min} 