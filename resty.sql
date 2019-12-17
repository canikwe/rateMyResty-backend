DROP DATABASE IF EXISTS resty;
CREATE DATABASE resty;

\c resty;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name TEXT
);

INSERT INTO users (name)
  VALUES ('Chine');

  INSERT INTO users (name)
    VALUES ('Trevor');

INSERT INTO users (name)
  VALUES ('Shannon');

-- run  ⚡ psql -f resty.sql in terminal