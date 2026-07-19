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
    portfolio_documents.id,
    portfolio_documents.content,
    portfolio_documents.metadata,
    ts_rank(portfolio_documents.fts, plainto_tsquery('english', query_text)) AS similarity
  FROM portfolio_documents
  WHERE portfolio_documents.fts @@ plainto_tsquery('english', query_text)
    AND portfolio_documents.metadata @> filter
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
