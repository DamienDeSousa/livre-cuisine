import { cacheTag } from "next/cache";
import { db } from "@/db";
import { ingredients, recettes } from "@/db/schema";

export type Ingredient = Pick<typeof ingredients.$inferSelect, "quantite" | "nom">;

export type Recette = Omit<typeof recettes.$inferSelect, "id"> & {
  ingredients: Ingredient[];
  etapes: string[];
};

// Les recettes changent rarement : on les met en cache sous ce tag, à
// invalider avec revalidateTag(TAG_RECETTES) après une écriture en base.
export const TAG_RECETTES = "recettes";

async function chercherRecettes(slug?: string): Promise<Recette[]> {
  const lignes = await db.query.recettes.findMany({
    columns: { id: false },
    where: slug ? (r, { eq }) => eq(r.slug, slug) : undefined,
    orderBy: (r, { asc }) => asc(r.numero),
    with: {
      ingredients: {
        columns: { quantite: true, nom: true },
        orderBy: (i, { asc }) => asc(i.ordre),
      },
      etapes: {
        columns: { texte: true },
        orderBy: (e, { asc }) => asc(e.ordre),
      },
    },
  });

  return lignes.map((recette) => ({
    ...recette,
    etapes: recette.etapes.map((etape) => etape.texte),
  }));
}

export async function getRecettes(): Promise<Recette[]> {
  "use cache";
  cacheTag(TAG_RECETTES);

  return chercherRecettes();
}

export async function getRecette(slug: string): Promise<Recette | undefined> {
  "use cache";
  cacheTag(TAG_RECETTES);

  const [recette] = await chercherRecettes(slug);
  return recette;
}

export async function getRecettesParCategorie(): Promise<[string, Recette[]][]> {
  const recettes = await getRecettes();
  return Object.entries(Object.groupBy(recettes, (r) => r.categorie)).map(
    ([categorie, liste]) => [categorie, liste ?? []],
  );
}

export function formatNumero(numero: number): string {
  return String(numero).padStart(2, "0");
}
