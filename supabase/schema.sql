create table if not exists public.page_meta (
  slug text primary key,
  title text,
  description text,
  keywords text,
  canonical text,
  featured_img text,
  no_index boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.page_meta add column if not exists featured_img text;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'page_meta' and column_name = 'og_title'
  ) then
    execute 'update public.page_meta set title = coalesce(title, og_title)';
    execute 'alter table public.page_meta drop column og_title';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'page_meta' and column_name = 'og_description'
  ) then
    execute 'update public.page_meta set description = coalesce(description, og_description)';
    execute 'alter table public.page_meta drop column og_description';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'page_meta' and column_name = 'og_image'
  ) then
    execute 'update public.page_meta set featured_img = coalesce(featured_img, og_image)';
    execute 'alter table public.page_meta drop column og_image';
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists page_meta_set_updated_at on public.page_meta;
create trigger page_meta_set_updated_at
before update on public.page_meta
for each row execute function public.set_updated_at();

alter table public.page_meta enable row level security;

drop policy if exists "page_meta_select_public" on public.page_meta;
create policy "page_meta_select_public"
on public.page_meta for select
to anon, authenticated
using (true);

drop policy if exists "page_meta_insert_admin" on public.page_meta;
create policy "page_meta_insert_admin"
on public.page_meta for insert
to authenticated
with check (true);

drop policy if exists "page_meta_update_admin" on public.page_meta;
create policy "page_meta_update_admin"
on public.page_meta for update
to authenticated
using (true)
with check (true);

drop policy if exists "page_meta_delete_admin" on public.page_meta;
create policy "page_meta_delete_admin"
on public.page_meta for delete
to authenticated
using (true);

insert into public.page_meta (slug, title, description, keywords, canonical, featured_img, no_index)
values
  ('about', 'About Us | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'About Us,Who We Are,About Us quotes,About Us providers,moving and storage services,moving quote comparison,interstate moving quotes,Lead Generation Focus,Provider Matching,Consumer Choice', 'https://bestinterstatemovingandstorage.com/about/', null, false),
  ('auto-transportation', 'Auto Transport Services | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Auto Transport Services,Vehicle Shipping,Auto Transport Services quotes,Auto Transport Services providers,moving and storage services,moving quote comparison,interstate moving quotes,SOLUTIONS FOR ALL VEHICLES', 'https://bestinterstatemovingandstorage.com/auto-transportation/', null, false),
  ('best-benefits', 'Best Benefits | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Best Benefits,Why Use The Platform,Best Benefits quotes,Best Benefits providers,moving and storage services,moving quote comparison,interstate moving quotes,Centralized Request,Faster Comparison,Broader Support', 'https://bestinterstatemovingandstorage.com/best-benefits/', null, false),
  ('boxes-and-moving-supplies', 'Boxes + moving supplies | Best Interstate Moving + Storage', 'Request piano transportation support for specialty items that need more planning and careful handling.', 'Boxes + moving supplies,Boxes + moving supplies quotes,Boxes + moving supplies providers,moving and storage services,moving quote comparison,interstate moving quotes', 'https://bestinterstatemovingandstorage.com/boxes-and-moving-supplies/', null, false),
  ('broadband-services', 'Broadband Services | Best Interstate Moving + Storage', 'Review broadband setup options so your new home or office is ready when the move is complete.', 'Broadband Services,Broadband Services quotes,Broadband Services providers,moving and storage services,moving quote comparison,interstate moving quotes', 'https://bestinterstatemovingandstorage.com/broadband-services/', null, false),
  ('commercial-business-moving', 'Commercial Moving Services | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Commercial Moving Services,Business Relocation,Commercial Moving Services quotes,Commercial Moving Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Business Movers,Office Moving Service', 'https://bestinterstatemovingandstorage.com/commercial-business-moving/', null, false),
  ('contact', 'Contact Us | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Contact Us,Start Your Request,Contact Us quotes,Contact Us providers,moving and storage services,moving quote comparison,interstate moving quotes,Call Us,Submit Details,Review Options', 'https://bestinterstatemovingandstorage.com/contact/', null, false),
  ('corporate-relocation', 'Corporate Relocation Services | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Corporate Relocation Services,Employee Mobility,Corporate Relocation Services quotes,Corporate Relocation Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Safe+Timely Delivery', 'https://bestinterstatemovingandstorage.com/corporate-relocation/', null, false),
  ('credit-card-payment', 'Pay Here | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Pay Here,Billing,Pay Here quotes,Pay Here providers,moving and storage services,moving quote comparison,interstate moving quotes,Billing Questions,Provider Coordination,Move Support', 'https://bestinterstatemovingandstorage.com/credit-card-payment/', null, false),
  ('custom-crating', 'Custom Crating | Best Interstate Moving + Storage', 'Plan custom crating for fragile, oversized, or high-value items that need extra protection.', 'Custom Crating,Custom Crating quotes,Custom Crating providers,moving and storage services,moving quote comparison,interstate moving quotes', 'https://bestinterstatemovingandstorage.com/custom-crating/', null, false),
  ('home', 'Best Interstate Moving + Storage', 'Easily connect with reliable moving and storage providers near you. Complete one contact form to receive personalized matches and quotes.', 'compare moving companies,compare storage services,moving quote request,moving company matches,moving and storage quotes,relocation providers', 'https://bestinterstatemovingandstorage.com/', null, false),
  ('moving-calculator', 'Moving Calculator | Best Interstate Moving + Storage', 'Use our moving calculator to estimate interstate moving costs, transit time, crew size, packing needs, and add-on services.', 'moving calculator,moving cost estimator,interstate moving calculator,moving quote planner,moving budget estimator', 'https://bestinterstatemovingandstorage.com/moving-calculator/', null, false),
  ('moving-insurance', 'Moving Insurance | Best Interstate Moving + Storage', 'Review moving protection questions and coverage considerations before choosing a provider.', 'Moving Insurance,Moving Insurance quotes,Moving Insurance providers,moving and storage services,moving quote comparison,interstate moving quotes,Coverage Review,Inventory Awareness,Decision Support', 'https://bestinterstatemovingandstorage.com/moving-insurance/', null, false),
  ('moving-solutions', 'Moving Solutions | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Moving Solutions,Add-On Support,Moving Solutions quotes,Moving Solutions providers,moving and storage services,moving quote comparison,interstate moving quotes,Packing + Supplies,Storage + Protection,Specialty Requests', 'https://bestinterstatemovingandstorage.com/moving-solutions/', null, false),
  ('packing', 'Packing Services | Best Interstate Moving + Storage', 'Compare packing and unpacking support based on the scope, timing, and labor needs of your move.', 'Packing Services,Packing Services quotes,Packing Services providers,moving and storage services,moving quote comparison,interstate moving quotes', 'https://bestinterstatemovingandstorage.com/packing/', null, false),
  ('piano-transportation', 'Piano Transportation | Best Interstate Moving + Storage', 'Request piano transportation support for specialty items that need more planning and careful handling.', 'Piano Transportation,Piano Transportation quotes,Piano Transportation providers,moving and storage services,moving quote comparison,interstate moving quotes', 'https://bestinterstatemovingandstorage.com/piano-transportation/', null, false),
  ('quote-results', 'Recommended Moving Companies | Best Interstate Moving + Storage', 'Review a shortlist of moving and storage providers after submitting your quote request.', 'moving company results,recommended movers,moving quote matches,moving provider list,storage provider matches', 'https://bestinterstatemovingandstorage.com/quote-results/', null, false),
  ('residential-moving', 'Residential Moving Services | Best Interstate Moving + Storage', 'To get your instant Free Quote Now. fill out our contact form.', 'Residential Moving Services,Home Moves,Residential Moving Services quotes,Residential Moving Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Safe+Timely Delivery', 'https://bestinterstatemovingandstorage.com/residential-moving/', null, false),
  ('reviews', 'Reviews | Best Interstate Moving + Storage', 'To get your instant Free Quote Now, fill out our contact form.', 'Reviews,What Customers Say,Reviews quotes,Reviews providers,moving and storage services,moving quote comparison,interstate moving quotes,Quote Comparison,Clear Communication,Time Savings', 'https://bestinterstatemovingandstorage.com/reviews/', null, false),
  ('service-area', 'Service Areas | Best Interstate Moving + Storage', 'Browse an interactive United States service area map and open dedicated state pages with moving company listings.', 'service areas,moving companies by state,united states moving map,state moving company listings', 'https://bestinterstatemovingandstorage.com/service-areas/', null, false),
  ('service-areas', 'Service Areas | Best Interstate Moving + Storage', 'Browse an interactive United States service area map and open dedicated state pages with moving quote forms.', 'service areas,moving quotes by state,united states moving map,state moving quote pages,moving estimate by state', 'https://bestinterstatemovingandstorage.com/service-areas/', null, false),
  ('service-areas__alabama', 'Alabama Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Alabama and compare local, statewide, and interstate relocation support.', 'Alabama moving quotes,Alabama movers,Alabama relocation services,Alabama moving estimate,Alabama interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/alabama/', null, false),
  ('service-areas__alaska', 'Alaska Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Alaska and compare local, statewide, and interstate relocation support.', 'Alaska moving quotes,Alaska movers,Alaska relocation services,Alaska moving estimate,Alaska interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/alaska/', null, false),
  ('service-areas__arizona', 'Arizona Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Arizona and compare local, statewide, and interstate relocation support.', 'Arizona moving quotes,Arizona movers,Arizona relocation services,Arizona moving estimate,Arizona interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/arizona/', null, false),
  ('service-areas__arkansas', 'Arkansas Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Arkansas and compare local, statewide, and interstate relocation support.', 'Arkansas moving quotes,Arkansas movers,Arkansas relocation services,Arkansas moving estimate,Arkansas interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/arkansas/', null, false),
  ('service-areas__california', 'California Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for California and compare local, statewide, and interstate relocation support.', 'California moving quotes,California movers,California relocation services,California moving estimate,California interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/california/', null, false),
  ('service-areas__colorado', 'Colorado Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Colorado and compare local, statewide, and interstate relocation support.', 'Colorado moving quotes,Colorado movers,Colorado relocation services,Colorado moving estimate,Colorado interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/colorado/', null, false),
  ('service-areas__connecticut', 'Connecticut Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Connecticut and compare local, statewide, and interstate relocation support.', 'Connecticut moving quotes,Connecticut movers,Connecticut relocation services,Connecticut moving estimate,Connecticut interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/connecticut/', null, false),
  ('service-areas__delaware', 'Delaware Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Delaware and compare local, statewide, and interstate relocation support.', 'Delaware moving quotes,Delaware movers,Delaware relocation services,Delaware moving estimate,Delaware interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/delaware/', null, false),
  ('service-areas__florida', 'Florida Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Florida and compare local, statewide, and interstate relocation support.', 'Florida moving quotes,Florida movers,Florida relocation services,Florida moving estimate,Florida interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/florida/', null, false),
  ('service-areas__georgia', 'Georgia Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Georgia and compare local, statewide, and interstate relocation support.', 'Georgia moving quotes,Georgia movers,Georgia relocation services,Georgia moving estimate,Georgia interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/georgia/', null, false),
  ('service-areas__hawaii', 'Hawaii Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Hawaii and compare local, statewide, and interstate relocation support.', 'Hawaii moving quotes,Hawaii movers,Hawaii relocation services,Hawaii moving estimate,Hawaii interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/hawaii/', null, false),
  ('service-areas__idaho', 'Idaho Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Idaho and compare local, statewide, and interstate relocation support.', 'Idaho moving quotes,Idaho movers,Idaho relocation services,Idaho moving estimate,Idaho interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/idaho/', null, false),
  ('service-areas__illinois', 'Illinois Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Illinois and compare local, statewide, and interstate relocation support.', 'Illinois moving quotes,Illinois movers,Illinois relocation services,Illinois moving estimate,Illinois interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/illinois/', null, false),
  ('service-areas__indiana', 'Indiana Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Indiana and compare local, statewide, and interstate relocation support.', 'Indiana moving quotes,Indiana movers,Indiana relocation services,Indiana moving estimate,Indiana interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/indiana/', null, false),
  ('service-areas__iowa', 'Iowa Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Iowa and compare local, statewide, and interstate relocation support.', 'Iowa moving quotes,Iowa movers,Iowa relocation services,Iowa moving estimate,Iowa interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/iowa/', null, false),
  ('service-areas__kansas', 'Kansas Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Kansas and compare local, statewide, and interstate relocation support.', 'Kansas moving quotes,Kansas movers,Kansas relocation services,Kansas moving estimate,Kansas interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/kansas/', null, false),
  ('service-areas__kentucky', 'Kentucky Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Kentucky and compare local, statewide, and interstate relocation support.', 'Kentucky moving quotes,Kentucky movers,Kentucky relocation services,Kentucky moving estimate,Kentucky interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/kentucky/', null, false),
  ('service-areas__louisiana', 'Louisiana Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Louisiana and compare local, statewide, and interstate relocation support.', 'Louisiana moving quotes,Louisiana movers,Louisiana relocation services,Louisiana moving estimate,Louisiana interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/louisiana/', null, false),
  ('service-areas__maine', 'Maine Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Maine and compare local, statewide, and interstate relocation support.', 'Maine moving quotes,Maine movers,Maine relocation services,Maine moving estimate,Maine interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/maine/', null, false),
  ('service-areas__maryland', 'Maryland Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Maryland and compare local, statewide, and interstate relocation support.', 'Maryland moving quotes,Maryland movers,Maryland relocation services,Maryland moving estimate,Maryland interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/maryland/', null, false),
  ('service-areas__massachusetts', 'Massachusetts Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Massachusetts and compare local, statewide, and interstate relocation support.', 'Massachusetts moving quotes,Massachusetts movers,Massachusetts relocation services,Massachusetts moving estimate,Massachusetts interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/massachusetts/', null, false),
  ('service-areas__michigan', 'Michigan Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Michigan and compare local, statewide, and interstate relocation support.', 'Michigan moving quotes,Michigan movers,Michigan relocation services,Michigan moving estimate,Michigan interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/michigan/', null, false),
  ('service-areas__minnesota', 'Minnesota Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Minnesota and compare local, statewide, and interstate relocation support.', 'Minnesota moving quotes,Minnesota movers,Minnesota relocation services,Minnesota moving estimate,Minnesota interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/minnesota/', null, false),
  ('service-areas__mississippi', 'Mississippi Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Mississippi and compare local, statewide, and interstate relocation support.', 'Mississippi moving quotes,Mississippi movers,Mississippi relocation services,Mississippi moving estimate,Mississippi interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/mississippi/', null, false),
  ('service-areas__missouri', 'Missouri Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Missouri and compare local, statewide, and interstate relocation support.', 'Missouri moving quotes,Missouri movers,Missouri relocation services,Missouri moving estimate,Missouri interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/missouri/', null, false),
  ('service-areas__montana', 'Montana Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Montana and compare local, statewide, and interstate relocation support.', 'Montana moving quotes,Montana movers,Montana relocation services,Montana moving estimate,Montana interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/montana/', null, false),
  ('service-areas__nebraska', 'Nebraska Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Nebraska and compare local, statewide, and interstate relocation support.', 'Nebraska moving quotes,Nebraska movers,Nebraska relocation services,Nebraska moving estimate,Nebraska interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/nebraska/', null, false),
  ('service-areas__nevada', 'Nevada Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Nevada and compare local, statewide, and interstate relocation support.', 'Nevada moving quotes,Nevada movers,Nevada relocation services,Nevada moving estimate,Nevada interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/nevada/', null, false),
  ('service-areas__new-hampshire', 'New Hampshire Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for New Hampshire and compare local, statewide, and interstate relocation support.', 'New Hampshire moving quotes,New Hampshire movers,New Hampshire relocation services,New Hampshire moving estimate,New Hampshire interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/new-hampshire/', null, false),
  ('service-areas__new-jersey', 'New Jersey Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for New Jersey and compare local, statewide, and interstate relocation support.', 'New Jersey moving quotes,New Jersey movers,New Jersey relocation services,New Jersey moving estimate,New Jersey interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/new-jersey/', null, false),
  ('service-areas__new-mexico', 'New Mexico Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for New Mexico and compare local, statewide, and interstate relocation support.', 'New Mexico moving quotes,New Mexico movers,New Mexico relocation services,New Mexico moving estimate,New Mexico interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/new-mexico/', null, false),
  ('service-areas__new-york', 'New York Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for New York and compare local, statewide, and interstate relocation support.', 'New York moving quotes,New York movers,New York relocation services,New York moving estimate,New York interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/new-york/', null, false),
  ('service-areas__north-carolina', 'North Carolina Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for North Carolina and compare local, statewide, and interstate relocation support.', 'North Carolina moving quotes,North Carolina movers,North Carolina relocation services,North Carolina moving estimate,North Carolina interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/north-carolina/', null, false),
  ('service-areas__north-dakota', 'North Dakota Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for North Dakota and compare local, statewide, and interstate relocation support.', 'North Dakota moving quotes,North Dakota movers,North Dakota relocation services,North Dakota moving estimate,North Dakota interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/north-dakota/', null, false),
  ('service-areas__ohio', 'Ohio Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Ohio and compare local, statewide, and interstate relocation support.', 'Ohio moving quotes,Ohio movers,Ohio relocation services,Ohio moving estimate,Ohio interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/ohio/', null, false),
  ('service-areas__oklahoma', 'Oklahoma Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Oklahoma and compare local, statewide, and interstate relocation support.', 'Oklahoma moving quotes,Oklahoma movers,Oklahoma relocation services,Oklahoma moving estimate,Oklahoma interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/oklahoma/', null, false),
  ('service-areas__oregon', 'Oregon Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Oregon and compare local, statewide, and interstate relocation support.', 'Oregon moving quotes,Oregon movers,Oregon relocation services,Oregon moving estimate,Oregon interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/oregon/', null, false),
  ('service-areas__pennsylvania', 'Pennsylvania Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Pennsylvania and compare local, statewide, and interstate relocation support.', 'Pennsylvania moving quotes,Pennsylvania movers,Pennsylvania relocation services,Pennsylvania moving estimate,Pennsylvania interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/pennsylvania/', null, false),
  ('service-areas__rhode-island', 'Rhode Island Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Rhode Island and compare local, statewide, and interstate relocation support.', 'Rhode Island moving quotes,Rhode Island movers,Rhode Island relocation services,Rhode Island moving estimate,Rhode Island interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/rhode-island/', null, false),
  ('service-areas__south-carolina', 'South Carolina Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for South Carolina and compare local, statewide, and interstate relocation support.', 'South Carolina moving quotes,South Carolina movers,South Carolina relocation services,South Carolina moving estimate,South Carolina interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/south-carolina/', null, false),
  ('service-areas__south-dakota', 'South Dakota Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for South Dakota and compare local, statewide, and interstate relocation support.', 'South Dakota moving quotes,South Dakota movers,South Dakota relocation services,South Dakota moving estimate,South Dakota interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/south-dakota/', null, false),
  ('service-areas__tennessee', 'Tennessee Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Tennessee and compare local, statewide, and interstate relocation support.', 'Tennessee moving quotes,Tennessee movers,Tennessee relocation services,Tennessee moving estimate,Tennessee interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/tennessee/', null, false),
  ('service-areas__texas', 'Texas Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Texas and compare local, statewide, and interstate relocation support.', 'Texas moving quotes,Texas movers,Texas relocation services,Texas moving estimate,Texas interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/texas/', null, false),
  ('service-areas__utah', 'Utah Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Utah and compare local, statewide, and interstate relocation support.', 'Utah moving quotes,Utah movers,Utah relocation services,Utah moving estimate,Utah interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/utah/', null, false),
  ('service-areas__vermont', 'Vermont Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Vermont and compare local, statewide, and interstate relocation support.', 'Vermont moving quotes,Vermont movers,Vermont relocation services,Vermont moving estimate,Vermont interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/vermont/', null, false),
  ('service-areas__virginia', 'Virginia Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Virginia and compare local, statewide, and interstate relocation support.', 'Virginia moving quotes,Virginia movers,Virginia relocation services,Virginia moving estimate,Virginia interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/virginia/', null, false),
  ('service-areas__washington', 'Washington Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Washington and compare local, statewide, and interstate relocation support.', 'Washington moving quotes,Washington movers,Washington relocation services,Washington moving estimate,Washington interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/washington/', null, false),
  ('service-areas__west-virginia', 'West Virginia Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for West Virginia and compare local, statewide, and interstate relocation support.', 'West Virginia moving quotes,West Virginia movers,West Virginia relocation services,West Virginia moving estimate,West Virginia interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/west-virginia/', null, false),
  ('service-areas__wisconsin', 'Wisconsin Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Wisconsin and compare local, statewide, and interstate relocation support.', 'Wisconsin moving quotes,Wisconsin movers,Wisconsin relocation services,Wisconsin moving estimate,Wisconsin interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/wisconsin/', null, false),
  ('service-areas__wyoming', 'Wyoming Moving Quotes | Best Interstate Moving + Storage', 'Start a moving quote request for Wyoming and compare local, statewide, and interstate relocation support.', 'Wyoming moving quotes,Wyoming movers,Wyoming relocation services,Wyoming moving estimate,Wyoming interstate movers', 'https://bestinterstatemovingandstorage.com/service-areas/wyoming/', null, false),
  ('services', 'Services | Best Interstate Moving + Storage', 'Compare household, commercial, corporate, and vehicle transport options through one streamlined quote request.', 'Services,Moving Services,Services quotes,Services providers,moving and storage services,moving quote comparison,interstate moving quotes,Residential Moves,Business Relocation,Corporate Support', 'https://www.bestinterstatemovingandstorage.com/services/', null, false),
  ('temporary-storage', 'Temporary Storage | Best Interstate Moving + Storage', 'Review temporary storage options when your pickup, delivery, or move-in dates do not align cleanly.', 'Temporary Storage,Temporary Storage quotes,Temporary Storage providers,moving and storage services,moving quote comparison,interstate moving quotes', 'https://bestinterstatemovingandstorage.com/temporary-storage/', null, false)
on conflict (slug) do update
set
  title = coalesce(page_meta.title, excluded.title),
  description = coalesce(page_meta.description, excluded.description),
  keywords = coalesce(page_meta.keywords, excluded.keywords),
  canonical = coalesce(page_meta.canonical, excluded.canonical),
  featured_img = coalesce(page_meta.featured_img, excluded.featured_img);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists blog_categories_set_updated_at on public.blog_categories;
create trigger blog_categories_set_updated_at
before update on public.blog_categories
for each row execute function public.set_updated_at();

alter table public.blog_categories enable row level security;

drop policy if exists "blog_categories_select_public" on public.blog_categories;
create policy "blog_categories_select_public"
on public.blog_categories for select
to anon, authenticated
using (true);

drop policy if exists "blog_categories_insert_admin" on public.blog_categories;
create policy "blog_categories_insert_admin"
on public.blog_categories for insert
to authenticated
with check (true);

drop policy if exists "blog_categories_update_admin" on public.blog_categories;
create policy "blog_categories_update_admin"
on public.blog_categories for update
to authenticated
using (true)
with check (true);

drop policy if exists "blog_categories_delete_admin" on public.blog_categories;
create policy "blog_categories_delete_admin"
on public.blog_categories for delete
to authenticated
using (true);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content_markdown text not null default '',
  content_html text not null default '',
  category_id uuid references public.blog_categories(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  featured_image text,
  meta_title text,
  meta_description text,
  meta_image text,
  no_index boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts add column if not exists content_html text not null default '';

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create index if not exists blog_posts_status_published_at_idx
on public.blog_posts (status, published_at desc);

create index if not exists blog_posts_category_id_idx
on public.blog_posts (category_id);

alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_select_public" on public.blog_posts;
create policy "blog_posts_select_public"
on public.blog_posts for select
to anon, authenticated
using (
  (status = 'published' and published_at is not null and published_at <= now())
  or auth.role() = 'authenticated'
);

drop policy if exists "blog_posts_insert_admin" on public.blog_posts;
create policy "blog_posts_insert_admin"
on public.blog_posts for insert
to authenticated
with check (true);

drop policy if exists "blog_posts_update_admin" on public.blog_posts;
create policy "blog_posts_update_admin"
on public.blog_posts for update
to authenticated
using (true)
with check (true);

drop policy if exists "blog_posts_delete_admin" on public.blog_posts;
create policy "blog_posts_delete_admin"
on public.blog_posts for delete
to authenticated
using (true);

grant usage on schema public to anon, authenticated, service_role;

grant select on public.page_meta, public.blog_categories, public.blog_posts to anon;

grant select, insert, update, delete
on public.page_meta, public.blog_categories, public.blog_posts
to authenticated, service_role;

grant usage, select on all sequences in schema public to authenticated, service_role;

alter default privileges in schema public grant select on tables to anon;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated, service_role;
alter default privileges in schema public grant usage, select on sequences to authenticated, service_role;
