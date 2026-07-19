CREATE OR REPLACE FUNCTION match_portfolio_documents (
  query_embedding vector(1024),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql
AS $$
  SELECT
    docs.id,
    docs.content,
    docs.metadata,
    1 - (docs.embedding <=> query_embedding) AS similarity
  FROM portfolio_documents AS docs
  WHERE docs.metadata @> filter
  ORDER BY docs.embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION keyword_search_documents(
  query_text text,
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity real
)
LANGUAGE sql
AS $$
  SELECT
    docs.id,
    docs.content,
    docs.metadata,
    ts_rank(docs.fts, plainto_tsquery('english', query_text)) AS similarity
  FROM portfolio_documents AS docs
  WHERE docs.fts @@ plainto_tsquery('english', query_text)
    AND docs.metadata @> filter
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
