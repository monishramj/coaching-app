CREATE OR REPLACE FUNCTION vector_search(
  -- parameters
  query_embedding vector(3072),
  match_user_uuid uuid,
  match_coach_uuid uuid,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  memory_id uuid,
  memory text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    user_memories.memory_id, --uuid of each memory row
    user_memories.memory, -- actual text of the memory
    /* Below calculates how similar each memory is to my query where 
    <=> is the cosine distance from operator to pg vector. 1 means same
    -1 means completely different/ unrelated.
    */
    1 - (user_memories.embedding <=> query_embedding) as similarity
  FROM user_memories
  WHERE 
    user_memories.user_id = match_user_uuid -- look at only memories of user and coach combo
    AND user_memories.coach_id = match_coach_uuid
    -- the threshold which determines how similar we return (default 70% similar)
    AND 1 - (user_memories.embedding <=> query_embedding) > match_threshold
  ORDER BY user_memories.embedding <=> query_embedding
  -- returns only the top N most similar memories (default being 5)
  LIMIT match_count;
END;
$$;