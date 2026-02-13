create or replace function check_limit_reached()
returns boolean
language plpgsql
security definer
as $$
declare
  user_limit int;
  current_count int;
begin
  -- 1. Get the limit for the current user from your 'check_limit' table
  -- We use "limit" with quotes because it is a reserved SQL keyword
  select "limit" into user_limit
  from public.check_limit
  where uuid = auth.uid();

  -- If no limit row exists, default to blocking (return true) or allowed (return false)
  -- Here we return true (blocked) to be safe, assuming every valid user has a row.
  if user_limit is null then
    return true; 
  end if;

  -- 2. Count how many coaches the user has already created
  select count(*) into current_count
  from public.coaches
  where created_by = auth.uid();

  -- 3. Return true if they have hit or exceeded the limit
  if current_count >= user_limit then
    return true;
  else
    return false;
  end if;
end;
$$;