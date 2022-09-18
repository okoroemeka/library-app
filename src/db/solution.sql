CREATE TABLE query1 AS
SELECT name, COUNT(name) AS moviecount
FROM genres
NATURAL JOIN  hasagenre
NATURAL JOIN  movies
GROUP BY name
ORDER BY moviecount;
--
----
CREATE TABLE query2 AS
SELECT name, AVG(rating) AS rating
FROM ratings
NATURAL JOIN  hasagenre
NATURAL JOIN  genres
GROUP BY name
ORDER BY rating;
--
CREATE TABLE query3 AS
SELECT title, COUNT(rating) AS countofratings
FROM ratings
NATURAL JOIN  movies
GROUP BY title
HAVING COUNT(rating) >= 10
ORDER BY countofratings;

--
CREATE TABLE query4 AS
SELECT movieid, title
FROM movies
NATURAL JOIN genres
NATURAL JOIN hasagenre
WHERE name = 'Comedy'
ORDER BY title;
--
CREATE TABLE query5 AS
SELECT title, AVG(rating) AS average
FROM movies
NATURAL JOIN ratings
GROUP BY title
ORDER BY title;
--
CREATE TABLE query6 AS
SELECT AVG(rating) AS average
FROM ratings
NATURAL JOIN genres
NATURAL JOIN hasagenre
WHERE name = 'Comedy'
ORDER BY average;

--
CREATE TABLE query7 AS
SELECT AVG(rating) AS average
FROM movies
NATURAL JOIN genres
NATURAL JOIN hasagenre
NATURAL JOIN ratings
WHERE name = 'Comedy' AND movies.movieid
IN (SELECT movieid
FROM movies
NATURAL JOIN genres
NATURAL JOIN hasagenre
NATURAL JOIN ratings
WHERE name = 'Romance');

--SELECT AVG(rating) AS average
--FROM ratings,genres G1,hasagenre
--WHERE G1.name = 'Comedy'
--INTERSECT
--(SELECT AVG(rating) AS average
--FROM ratings,genres G1,hasagenre
--WHERE G1.name != 'Romance'
--ORDER BY average);
--
CREATE TABLE query8 AS
SELECT AVG(rating) AS average
FROM movies
NATURAL JOIN genres
NATURAL JOIN hasagenre
NATURAL JOIN ratings
WHERE name = 'Romance' AND movies.movieid
NOT IN (SELECT movieid
FROM movies
NATURAL JOIN genres
NATURAL JOIN hasagenre
NATURAL JOIN ratings
WHERE name = 'Comedy');

--
CREATE TABLE query9 AS
SELECT movieid, rating
FROM ratings R
WHERE R.userid = :v1

