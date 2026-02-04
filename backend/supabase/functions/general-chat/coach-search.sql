CREATE OR REPLACE FUNCTION coach_search(
   match_coach_uuid uuid
)
RETURNS TABLE (
   training_model text,
   personality text,
   custom_instructions text
)
LANGUAGE plpgsql
AS $$
BEGIN
   RETURN QUERY
   SELECT
      coaches.training_model,
      coaches.personality,
      coaches.custom_instructions
   FROM coaches
   WHERE
      coaches.coach_id = match_coach_uuid
   LIMIT 1;
END;
$$;