import { relations, sql } from "drizzle-orm";
import {
  check,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

export const recettes = pgTable(
  "recettes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: text().notNull().unique(),
    numero: integer().notNull().unique(),
    nom: text().notNull(),
    sousTitre: text("sous_titre").notNull(),
    categorie: text().notNull(),
    saison: text().notNull(),
    duree: integer().notNull(),
    personnes: integer().notNull(),
    photo: text(),
    note: text(),
  },
  (table) => [
    check("duree_positive", sql`${table.duree} > 0`),
    check("personnes_positive", sql`${table.personnes} > 0`),
  ],
);

export const ingredients = pgTable(
  "ingredients",
  {
    recetteId: integer("recette_id")
      .notNull()
      .references(() => recettes.id, { onDelete: "cascade" }),
    ordre: integer().notNull(),
    quantite: text().notNull().default(""),
    nom: text().notNull(),
  },
  (table) => [primaryKey({ columns: [table.recetteId, table.ordre] })],
);

export const etapes = pgTable(
  "etapes",
  {
    recetteId: integer("recette_id")
      .notNull()
      .references(() => recettes.id, { onDelete: "cascade" }),
    ordre: integer().notNull(),
    texte: text().notNull(),
  },
  (table) => [primaryKey({ columns: [table.recetteId, table.ordre] })],
);

export const recettesRelations = relations(recettes, ({ many }) => ({
  ingredients: many(ingredients),
  etapes: many(etapes),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recette: one(recettes, {
    fields: [ingredients.recetteId],
    references: [recettes.id],
  }),
}));

export const etapesRelations = relations(etapes, ({ one }) => ({
  recette: one(recettes, {
    fields: [etapes.recetteId],
    references: [recettes.id],
  }),
}));
