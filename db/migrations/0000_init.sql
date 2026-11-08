CREATE TABLE "etapes" (
	"recette_id" integer NOT NULL,
	"ordre" integer NOT NULL,
	"texte" text NOT NULL,
	CONSTRAINT "etapes_recette_id_ordre_pk" PRIMARY KEY("recette_id","ordre")
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"recette_id" integer NOT NULL,
	"ordre" integer NOT NULL,
	"quantite" text DEFAULT '' NOT NULL,
	"nom" text NOT NULL,
	CONSTRAINT "ingredients_recette_id_ordre_pk" PRIMARY KEY("recette_id","ordre")
);
--> statement-breakpoint
CREATE TABLE "recettes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recettes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"numero" integer NOT NULL,
	"nom" text NOT NULL,
	"sous_titre" text NOT NULL,
	"categorie" text NOT NULL,
	"saison" text NOT NULL,
	"duree" integer NOT NULL,
	"personnes" integer NOT NULL,
	"photo" text,
	"note" text,
	CONSTRAINT "recettes_slug_unique" UNIQUE("slug"),
	CONSTRAINT "recettes_numero_unique" UNIQUE("numero"),
	CONSTRAINT "duree_positive" CHECK ("recettes"."duree" > 0),
	CONSTRAINT "personnes_positive" CHECK ("recettes"."personnes" > 0)
);
--> statement-breakpoint
ALTER TABLE "etapes" ADD CONSTRAINT "etapes_recette_id_recettes_id_fk" FOREIGN KEY ("recette_id") REFERENCES "public"."recettes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recette_id_recettes_id_fk" FOREIGN KEY ("recette_id") REFERENCES "public"."recettes"("id") ON DELETE cascade ON UPDATE no action;