DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS borrow CASCADE;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE book_availability AS ENUM ('available', 'borrowed','not_yet_availble');
CREATE TYPE book_category AS ENUM ('drama', 'prose','tragedy','poetry');
CREATE TYPE permission AS ENUM ('basic','admin');
SELECT uuid_generate_v1();

CREATE TABLE users (userid uuid DEFAULT uuid_generate_v4(), email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255), department VARCHAR NOT NULL, permission permission DEFAULT 'basic', PRIMARY KEY(userid));

CREATE TABLE books (bookid uuid DEFAULT uuid_generate_v4(), author VARCHAR NOT NULL, title VARCHAR NOT NULL, category book_category NOT NULL, availability book_availability NOT NULL, available_count NUMERIC NOT NULL, book_count NUMERIC NOT NULL, PRIMARY KEY(bookid));
--
CREATE TABLE borrow (bookid uuid NOT NULL REFERENCES books(bookid),userid uuid NOT NULL REFERENCES users(userid));
--CREATE TABLE rating (bookid uuid NOT NULL REFERENCES books(bookid),userid uuid NOT NULL REFERENCES users(userid));

--DROP TABLE IF EXISTS ratings CASCADE;
--DROP TABLE IF EXISTS tags CASCADE;
--DROP TABLE IF EXISTS hasagenre CASCADE;
----user
--CREATE TABLE users (userid INT NOT NULL PRIMARY KEY, name VARCHAR NOT NULL);
----movies
--CREATE TABLE movies (movieid INT NOT NULL PRIMARY KEY, title VARCHAR NOT NULL);
----taginfo
--CREATE TABLE taginfo (tagid INT NOT NULL PRIMARY KEY, content VARCHAR NOT NULL);
----genres
--CREATE TABLE genres(genreId INT NOT NULL PRIMARY KEY, name VARCHAR NOT NULL);
---- ratings
--CREATE TABLE ratings(userid INT NOT NULL REFERENCES users(userid), movieid INT NOT NULL REFERENCES movies(movieid), rating NUMERIC NOT NULL CHECK(rating<=5), timestamp BIGINT NOT NULL);
----tags
--CREATE TABLE tags (userid INT NOT NULL REFERENCES users(userid), movieid INT NOT NULL REFERENCES movies(movieid), tagid INT NOT NULL REFERENCES taginfo(tagid), timestamp BIGINT NOT NULL);
----hasagenre
--CREATE TABLE hasagenre(movieid INT NOT NULL REFERENCES movies(movieid), genreId INT NOT NULL REFERENCES genres(genreId));