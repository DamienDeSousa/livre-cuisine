import donnees from "@/data/recettes.json";

export type Ingredient = {
  quantite: string;
  nom: string;
};

export type Recette = {
  slug: string;
  numero: number;
  nom: string;
  sousTitre: string;
  categorie: string;
  saison: string;
  duree: number;
  personnes: number;
  photo: string | null;
  ingredients: Ingredient[];
  etapes: string[];
  note: string | null;
};

const recettes = (donnees as Recette[]).toSorted(
  (a, b) => a.numero - b.numero,
);

export function getRecettes(): Recette[] {
  return recettes;
}

export function getRecette(slug: string): Recette | undefined {
  return recettes.find((recette) => recette.slug === slug);
}

export function getRecettesParCategorie(): [string, Recette[]][] {
  return Object.entries(Object.groupBy(recettes, (r) => r.categorie)).map(
    ([categorie, liste]) => [categorie, liste ?? []],
  );
}

export function formatNumero(numero: number): string {
  return String(numero).padStart(2, "0");
}
