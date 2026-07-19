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
