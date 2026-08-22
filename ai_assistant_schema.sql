-- =========================================================================
-- ai_assistant_schema.sql
-- Mavjud schema.sql'ga QO'SHIMCHA — AI Yordamchi moduli uchun jadvallar.
-- Bularni mavjud Supabase loyihangizda alohida ishga tushiring.
-- =========================================================================

-- Suhbat tarixi
create table if not exists ai_chat_messages (
    id                  uuid primary key default uuid_generate_v4(),
    telegram_id         bigint not null,
    role                text not null check (role in ('user', 'assistant')),
    content_type        text not null default 'text' check (content_type in ('text', 'voice', 'photo', 'video', 'mixed')),
    text_content         text,
    created_at           timestamptz not null default now()
);

comment on table ai_chat_messages is 'Rahbar va AI Yordamchi orasidagi suhbat tarixi';

create index if not exists idx_ai_chat_messages_telegram_id on ai_chat_messages(telegram_id);
create index if not exists idx_ai_chat_messages_created_at on ai_chat_messages(created_at desc);

-- Kunlik foydalanish limiti
create table if not exists ai_chat_usage (
    id                  uuid primary key default uuid_generate_v4(),
    telegram_id         bigint not null,
    usage_date          date not null default current_date,
    message_count       integer not null default 0,

    unique (telegram_id, usage_date)
);

comment on table ai_chat_usage is 'Kunlik AI Yordamchi xabarlar soni — xarajatni nazorat qilish uchun (hozircha 30/kun)';

create index if not exists idx_ai_chat_usage_telegram_id on ai_chat_usage(telegram_id);

-- Xavfsizlik
alter table ai_chat_messages enable row level security;
alter table ai_chat_usage enable row level security;
