import { pgTable, serial, text, timestamp, } from 'drizzle-orm/pg-core'

export const boards = pgTable("boards", {
  id: serial("id").primaryKey(),
  board_name: text("board_name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  board_id: serial("board_id").references(() => boards.id),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
