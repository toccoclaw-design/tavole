-- Tavolè initial schema draft
-- Foundation-only migration placeholder.

create table if not exists profiles (
  id uuid primary key,
  full_name text,
  email text not null,
  global_role text,
  created_at timestamptz not null default now()
);

create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text not null,
  description text,
  logo_url text,
  hero_image_url text,
  theme_settings jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists venue_users (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  poster_url text,
  start_at timestamptz not null,
  end_at timestamptz,
  booking_open_at timestamptz,
  booking_close_at timestamptz,
  booking_enabled boolean not null default true,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (venue_id, slug)
);

create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  code text not null,
  name text not null,
  tier text not null,
  pax_included integer not null,
  included_bottle_count integer not null,
  base_price numeric(10,2) not null,
  extra_guest_price numeric(10,2) not null,
  max_extra_guest_count integer not null default 5,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bottles (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  code text not null,
  name text not null,
  category text not null,
  image_url text,
  extra_price numeric(10,2) not null,
  included_selectable boolean not null default true,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists package_bottle_rules (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  slot_index integer not null,
  selection_mode text not null,
  allowed_category text,
  allowed_bottle_id uuid references bottles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  package_id uuid not null references packages(id) on delete restrict,
  status text not null default 'pending',
  occasion_type text,
  extra_guest_count integer not null default 0,
  guest_count_total integer not null,
  notes text,
  estimated_total numeric(10,2) not null,
  customer_name text not null,
  customer_surname text not null,
  customer_email text not null,
  customer_phone text not null,
  source_channel text not null default 'web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists booking_bottles (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  bottle_id uuid not null references bottles(id) on delete restrict,
  kind text not null,
  quantity integer not null default 1,
  slot_index integer,
  unit_price numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  from_status text,
  to_status text not null,
  changed_by_user_id uuid references profiles(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists notification_logs (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  channel text not null,
  recipient_type text not null,
  recipient_address text,
  template_key text not null,
  status text not null,
  provider_message_id text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  session_id text,
  event_name text not null,
  step_name text,
  metadata jsonb,
  created_at timestamptz not null default now()
);
