-- 1. Redefine the keyword_search_documents function to use an OR-based search instead of strict AND
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
    -- Strip punctuation, trim whitespace, and replace spaces with the | (OR) operator for tsquery
    ts_rank(docs.fts, to_tsquery('english', nullif(trim(regexp_replace(query_text, '[^\w]+', ' | ', 'g'), ' |'), ''))) AS similarity
  FROM portfolio_documents AS docs
  -- We now use the same OR-based tsquery in the WHERE clause
  WHERE docs.fts @@ to_tsquery('english', nullif(trim(regexp_replace(query_text, '[^\w]+', ' | ', 'g'), ' |'), ''))
    AND docs.metadata @> filter
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
