create table films (
  id bigserial primary key,
  content text,
  embedding vector(768)
);

-- Create a function to search for documents
create or replace function match_films (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    films.id,
    films.content,
    1 - (films.embedding <=> query_embedding) as similarity
  from films
  where 1 - (films.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;