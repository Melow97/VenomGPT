alter table public.profiles add column if not exists revolut_customer_id uuid;
alter table public.profiles add column if not exists revolut_subscription_id uuid;
alter table public.profiles add column if not exists billing_plan text;
alter table public.profiles add column if not exists billing_status text;
alter table public.profiles add column if not exists billing_updated_at timestamptz;
