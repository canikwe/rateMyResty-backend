DROP DATABASE IF EXISTS resty;
CREATE DATABASE resty;

\c resty;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name)
  VALUES ('Chine');

  INSERT INTO users (name)
    VALUES ('Trevor');

INSERT INTO users (name)
  VALUES ('Shannon');

-- run  ⚡ psql -f resty.sql in terminal