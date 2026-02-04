/*
    We reserve 75 memories per user with a buffer of 10. This
    means that if a user has 74 memories and they generate 10
    new ones, their memory limit may temporarily go up to 85
    before this function is called to limit it to 75.

    The buffer is 10 because the maximum number of bullet points
    we expect to recieve from summary.ts is 10 (ideally lower).
*/

/*
    This SQL is never run from vscode, it only exists here for 
    version control and recordkeeping. The actual function runs 
    directly on supabase and is called towards the end of 
    create-row.ts as needed.
*/

CREATE FUNCTION delete_least_accessed_memories(p_user_id UUID, p_coach_id UUID p_max_count INT)
RETURNS VOID AS $$
BEGIN
 -- Delete from table user-memories
  DELETE FROM user_memories
  -- Delete according to memory_id if it follows the rules within {}
  WHERE memory_id IN (
    --choosing the memory id to delete
    SELECT memory_id
    FROM user_memories
    -- if the userid associated with the memory is the same as that of the user
    -- aka its the same as the user who has hit memory capacity for that chat
    WHERE user_id = p_user_id
    AND coach_id = p_coach_id
    -- we order the memory by least accessed at date, oldest first
    ORDER BY last_accessed ASC
    -- determining how many we delete, do # they have - max allowed with a floor of 0
    LIMIT GREATEST((SELECT COUNT(*) FROM user_memories WHERE user_id = p_user_id) - p_max_count, 0)
  );
END;
$$ LANGUAGE plpgsql;