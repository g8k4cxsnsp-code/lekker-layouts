-- ============================================================
-- Lekker Layouts — Full Database Schema
-- Run this in the Supabase SQL Editor after creating your project
-- ============================================================

-- ─── Enable extensions ──────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ═══════════════════════════════════════════════════════════
-- STEP 1: Create all tables first (no policies yet)
-- ═══════════════════════════════════════════════════════════

-- ─── PROFILES ───────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  business_name text,
  industry text,
  business_description text,
  target_audience text,
  location text,
  logo_url text,
  website_url text,
  social_links jsonb default '{}'::jsonb,
  brand_personality text[] default '{}',
  brand_voice text,
  services_products text,
  unique_selling_point text,
  years_experience text,
  is_premium boolean default false,
  premium_expires_at timestamptz,
  is_verified boolean default false,
  profile_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── POSTS ──────────────────────────────────────────────────
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  image_urls text[] default '{}',
  post_type text default 'update' check (post_type in ('update', 'deal', 'announcement')),
  likes_count integer default 0,
  comments_count integer default 0,
  created_at timestamptz default now()
);

-- ─── POST LIKES ─────────────────────────────────────────────
create table public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

-- ─── POST COMMENTS ──────────────────────────────────────────
create table public.post_comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- ─── CONNECTIONS ────────────────────────────────────────────
create table public.connections (
  id uuid primary key default uuid_generate_v4(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz default now(),
  unique (requester_id, receiver_id)
);

-- ─── CONVERSATIONS ──────────────────────────────────────────
create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  type text default 'direct' check (type in ('direct', 'group')),
  name text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- ─── CONVERSATION MEMBERS ───────────────────────────────────
create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  last_read_at timestamptz default now(),
  primary key (conversation_id, user_id)
);

-- ─── MESSAGES ───────────────────────────────────────────────
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- ─── NOTIFICATIONS ──────────────────────────────────────────
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  data jsonb default '{}'::jsonb,
  read boolean default false,
  created_at timestamptz default now()
);

-- ─── ORDERS ─────────────────────────────────────────────────
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  product_slug text not null,
  product_name text not null,
  amount integer not null,
  status text default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  yoco_checkout_id text,
  questionnaire_responses jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── SUBSCRIPTIONS ──────────────────────────────────────────
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan text default 'premium',
  status text default 'active' check (status in ('active', 'expired', 'cancelled')),
  amount integer not null,
  current_period_start timestamptz default now(),
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════
-- STEP 2: Triggers & Functions
-- ═══════════════════════════════════════════════════════════

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Likes count trigger
create or replace function public.update_likes_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.posts set likes_count = likes_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.posts set likes_count = greatest(likes_count - 1, 0) where id = old.post_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

create trigger on_like_change
  after insert or delete on public.post_likes
  for each row execute procedure public.update_likes_count();

-- Comments count trigger
create or replace function public.update_comments_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.posts set comments_count = comments_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.posts set comments_count = greatest(comments_count - 1, 0) where id = old.post_id;
    return old;
  end if;
end;
$$ language plpgsql security definer;

create trigger on_comment_change
  after insert or delete on public.post_comments
  for each row execute procedure public.update_comments_count();

-- ═══════════════════════════════════════════════════════════
-- STEP 3: Enable RLS and create all policies
-- ═══════════════════════════════════════════════════════════

-- Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Posts
alter table public.posts enable row level security;
create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Users can create own posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "Users can delete own posts" on public.posts for delete using (auth.uid() = user_id);

-- Post likes
alter table public.post_likes enable row level security;
create policy "Likes are viewable by everyone" on public.post_likes for select using (true);
create policy "Users can like posts" on public.post_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike posts" on public.post_likes for delete using (auth.uid() = user_id);

-- Post comments
alter table public.post_comments enable row level security;
create policy "Comments are viewable by everyone" on public.post_comments for select using (true);
create policy "Users can create comments" on public.post_comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on public.post_comments for delete using (auth.uid() = user_id);

-- Connections
alter table public.connections enable row level security;
create policy "Users can see own connections" on public.connections for select using (auth.uid() = requester_id or auth.uid() = receiver_id);
create policy "Users can send connection requests" on public.connections for insert with check (auth.uid() = requester_id);
create policy "Receiver can update connection status" on public.connections for update using (auth.uid() = receiver_id);
create policy "Either user can delete connection" on public.connections for delete using (auth.uid() = requester_id or auth.uid() = receiver_id);

-- Conversations
alter table public.conversations enable row level security;
create policy "Members can view their conversations" on public.conversations for select using (id in (select conversation_id from public.conversation_members where user_id = auth.uid()));
create policy "Authenticated users can create conversations" on public.conversations for insert with check (auth.uid() = created_by);

-- Conversation members
alter table public.conversation_members enable row level security;
create policy "Members can see membership" on public.conversation_members for select using (conversation_id in (select conversation_id from public.conversation_members cm where cm.user_id = auth.uid()));
create policy "Authenticated users can add members" on public.conversation_members for insert with check (true);
create policy "Members can update their own read status" on public.conversation_members for update using (auth.uid() = user_id);

-- Messages
alter table public.messages enable row level security;
create policy "Members can view messages in their conversations" on public.messages for select using (conversation_id in (select conversation_id from public.conversation_members where user_id = auth.uid()));
create policy "Members can send messages to their conversations" on public.messages for insert with check (auth.uid() = sender_id and conversation_id in (select conversation_id from public.conversation_members where user_id = auth.uid()));

-- Notifications
alter table public.notifications enable row level security;
create policy "Users can see own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Authenticated users can create notifications" on public.notifications for insert with check (true);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id);

-- Orders
alter table public.orders enable row level security;
create policy "Users can see own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Authenticated users can create orders" on public.orders for insert with check (auth.uid() = user_id);

-- Subscriptions
alter table public.subscriptions enable row level security;
create policy "Users can see own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Authenticated users can create subscriptions" on public.subscriptions for insert with check (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════
-- STEP 4: Storage, Realtime, Indexes
-- ═══════════════════════════════════════════════════════════

-- Storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 2097152, '{image/jpeg,image/png,image/webp}'),
  ('post-images', 'post-images', true, 5242880, '{image/jpeg,image/png,image/webp,image/gif}')
on conflict (id) do nothing;

-- Storage policies
create policy "Anyone can view avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "Users can upload own avatar" on storage.objects for insert with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users can update own avatar" on storage.objects for update using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Anyone can view post images" on storage.objects for select using (bucket_id = 'post-images');
create policy "Users can upload post images" on storage.objects for insert with check (bucket_id = 'post-images' and (storage.foldername(name))[1] = auth.uid()::text);

-- Realtime
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;

-- Indexes
create index idx_posts_user_id on public.posts(user_id);
create index idx_posts_created_at on public.posts(created_at desc);
create index idx_post_likes_user on public.post_likes(user_id);
create index idx_connections_requester on public.connections(requester_id);
create index idx_connections_receiver on public.connections(receiver_id);
create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_notifications_user on public.notifications(user_id, created_at desc);
create index idx_orders_user on public.orders(user_id);
create index idx_profiles_premium on public.profiles(is_premium desc, created_at desc);
create index idx_profiles_industry on public.profiles(industry);
