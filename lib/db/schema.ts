import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const boards = pgTable("boards", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  board_name: text("board_name").notNull(),
  board_description: text("board_description"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const lists = pgTable("lists", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  order: integer("order").notNull(),
  description: text("description"),

  board_id: integer("board_id").references(() => boards.id, {
    onDelete: "cascade",
  }),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  order: integer("order").notNull(),
  description: text("description"),
  list_id: integer("list_id").references(() => lists.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull(),
});
