-- ============================================================
-- ToolOrbit Phase 1 - Initial D1 schema
-- Run:  npx wrangler d1 execute toolorbit --file=migrations/0001_init.sql
-- Local: npx wrangler d1 execute toolorbit --local --file=migrations/0001_init.sql
-- ============================================================

-- better-auth managed tables -----------------------------------

CREATE TABLE IF NOT EXISTS "user" (
  "id"             TEXT PRIMARY KEY NOT NULL,
  "name"           TEXT NOT NULL,
  "email"          TEXT NOT NULL UNIQUE,
  "email_verified" INTEGER NOT NULL DEFAULT 0,
  "image"          TEXT,
  "created_at"     INTEGER NOT NULL,
  "updated_at"     INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
  "id"          TEXT PRIMARY KEY NOT NULL,
  "expires_at"  INTEGER NOT NULL,
  "token"       TEXT NOT NULL UNIQUE,
  "created_at"  INTEGER NOT NULL,
  "updated_at"  INTEGER NOT NULL,
  "ip_address"  TEXT,
  "user_agent"  TEXT,
  "user_id"     TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id"                      TEXT PRIMARY KEY NOT NULL,
  "account_id"              TEXT NOT NULL,
  "provider_id"             TEXT NOT NULL,
  "user_id"                 TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "access_token"            TEXT,
  "refresh_token"           TEXT,
  "id_token"                TEXT,
  "access_token_expires_at" INTEGER,
  "refresh_token_expires_at" INTEGER,
  "scope"                   TEXT,
  "password"                TEXT,
  "created_at"              INTEGER NOT NULL,
  "updated_at"              INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id"          TEXT PRIMARY KEY NOT NULL,
  "identifier"  TEXT NOT NULL,
  "value"       TEXT NOT NULL,
  "expires_at"  INTEGER NOT NULL,
  "created_at"  INTEGER,
  "updated_at"  INTEGER
);

-- App tables ---------------------------------------------------

CREATE TABLE IF NOT EXISTS "favorites" (
  "id"         TEXT PRIMARY KEY NOT NULL,
  "user_id"    TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "tool_slug"  TEXT NOT NULL,
  "created_at" INTEGER,
  UNIQUE ("user_id", "tool_slug")
);

CREATE TABLE IF NOT EXISTS "usage_history" (
  "id"         TEXT PRIMARY KEY NOT NULL,
  "user_id"    TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "tool_slug"  TEXT NOT NULL,
  "used_at"    INTEGER
);

-- Indexes for dashboard queries --------------------------------

CREATE INDEX IF NOT EXISTS "idx_favorites_user_id"      ON "favorites"("user_id");
CREATE INDEX IF NOT EXISTS "idx_usage_history_user_id"  ON "usage_history"("user_id");
CREATE INDEX IF NOT EXISTS "idx_usage_history_used_at"  ON "usage_history"("used_at" DESC);
CREATE INDEX IF NOT EXISTS "idx_session_token"          ON "session"("token");
CREATE INDEX IF NOT EXISTS "idx_session_user_id"        ON "session"("user_id");
