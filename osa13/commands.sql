CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
 );


insert into blogs (author,url,title,likes) values ('Author1','URL1','Title1',1);
insert into blogs (author,url,title,likes) values ('Author2','URL2','Title2',2);