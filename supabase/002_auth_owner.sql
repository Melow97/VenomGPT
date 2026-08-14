-- Venom GPT owner-role bootstrap
-- The owner email is configuration, not a secret. API keys remain server-side secrets.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, plan, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    case when lower(coalesce(new.email, '')) = lower('melozturk00@gmail.com') then 'pro' else 'free' end,
    case when lower(coalesce(new.email, '')) = lower('melozturk00@gmail.com') then 'owner' else 'user' end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
