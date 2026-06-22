-- Schéma Souk — à exécuter dans Supabase > SQL Editor > New query

-- Boutiques
create table if not exists shops (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  emoji text default '🛍️',
  categories text[] default '{}',
  created_at timestamptz default now()
);

-- Produits
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  shop_id uuid references shops(id) on delete cascade,
  name text not null,
  price integer not null,
  old_price integer,
  is_sale boolean default false,
  image_url text,
  categories text[] default '{}',
  created_at timestamptz default now()
);

-- Profils clients
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text,
  wishlist uuid[] default '{}',
  wallet_points integer default 0,
  created_at timestamptz default now()
);

-- Commandes
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id),
  shop_id uuid references shops(id),
  product_id uuid references products(id),
  price integer not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'delivered')),
  created_at timestamptz default now()
);

-- Paramètres globaux
create table if not exists settings (
  id integer primary key default 1 check (id = 1),
  whatsapp_number text default '212600000000'
);
insert into settings (id, whatsapp_number) values (1, '212600000000')
on conflict (id) do nothing;

-- Accès public en lecture (clients non connectés peuvent voir le catalogue)
alter table shops enable row level security;
alter table products enable row level security;
alter table settings enable row level security;

create policy "Lecture publique boutiques" on shops for select using (true);
create policy "Lecture publique produits" on products for select using (true);
create policy "Lecture publique settings" on settings for select using (true);

-- Écriture ouverte pour l'instant (à sécuriser avec auth admin plus tard)
create policy "Écriture boutiques" on shops for all using (true);
create policy "Écriture produits" on products for all using (true);
create policy "Écriture settings" on settings for all using (true);

-- Storage bucket pour les photos
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Upload photos produits" on storage.objects
  for insert with check (bucket_id = 'product-images');
create policy "Lecture photos produits" on storage.objects
  for select using (bucket_id = 'product-images');
