\c nc_news_test

-- SELECT*FROM comments WHERE article_id = 1;

-- SELECT articles.article_id,articles.title,comments.article_id FROM articles
-- LEFT JOIN comments ON articles.article_id = comments.article_id;



SELECT articles.article_id, COUNT(comment_id) AS comment_count FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id;



-- SELECT directors.*, COUNT(film_id) AS film_count FROM directors
-- LEFT JOIN films ON films.director_id = directors.director_id
-- GROUP BY directors.director_id;