-- 1. Add a generated tsvector column for fast full-text search
ALTER TABLE portfolio_documents
ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED;

-- 2. Create an index on the tsvector column
CREATE INDEX portfolio_documents_fts_idx ON portfolio_documents USING GIN (fts);

-- 3. Create a function for keyword search (BM25 style)
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
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
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
END;
$$;
