-- Keep track of sql command for setup

CREATE DATABASE twitter_clone;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL
);


