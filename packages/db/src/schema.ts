import { text, integer, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';

// -----------------------------------------------
// Better-auth managed tables (auto-migrated by better-auth)
// These are here for Drizzle type safety only — better-auth creates them.
// -----------------------------------------------
export const user = sqliteTable('user', {
  id:            text('id').primaryKey(),
  name:          text('name').notNull(),
  email:         text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image:         text('image'),
  createdAt:     integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt:     integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const session = sqliteTable('session', {
  id:        text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token:     text('token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId:    text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
});

export const account = sqliteTable('account', {
  id:                   text('id').primaryKey(),
  accountId:            text('account_id').notNull(),
  providerId:           text('provider_id').notNull(),
  userId:               text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken:          text('access_token'),
  refreshToken:         text('refresh_token'),
  idToken:              text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt:integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope:                text('scope'),
  password:             text('password'),
  createdAt:            integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt:            integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id:         text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value:      text('value').notNull(),
  expiresAt:  integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt:  integer('created_at', { mode: 'timestamp' }),
  updatedAt:  integer('updated_at', { mode: 'timestamp' }),
});

// -----------------------------------------------
// App-specific tables
// -----------------------------------------------

/** Tools saved by a logged-in user */
export const favorites = sqliteTable('favorites', {
  id:        text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId:    text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  toolSlug:  text('tool_slug').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (t) => ({
  // Each (userId, toolSlug) pair must be unique
  pk: primaryKey({ columns: [t.userId, t.toolSlug] }),
}));

/** Last 50 tool usages per user */
export const usageHistory = sqliteTable('usage_history', {
  id:        text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId:    text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  toolSlug:  text('tool_slug').notNull(),
  usedAt:    integer('used_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export type User          = typeof user.$inferSelect;
export type Favorite      = typeof favorites.$inferSelect;
export type UsageHistory  = typeof usageHistory.$inferSelect;
