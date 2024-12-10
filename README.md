# Webapp Express
## Obiettivo: Creare una semplice app gestionale per inserire film e recensioni pubbliche

### Struttura Database

# Table: movies
# Table: reviews

## movies table:
- id           | int AI PK NN
- title        | varchar(150) NN
- director     | varchar(150) NN
- genre        | varchar(200) 
- release_year | year NN
- abstract     | text(500) NN
- image        | varchar(255) 
- created_at   | timestamp
- updated_at   | timestamp


## reviews table:
- id         | int AI PK NN
- movie_id   | int FK NN 
- name       | varchar(50) DEFAULT('anonymous')
- vote       | tinyint(5) NN
- text       | text(500) NN
- created_at | timestamp
- updated_at | timestamp