alter table "public"."request" add column "provider" text not null default 'OPENAI'::text;