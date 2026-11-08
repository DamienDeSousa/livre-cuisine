// Ajoute les recettes de départ absentes de la base (par slug ou numéro).
// Ne modifie ni ne supprime les recettes existantes.
// Usage : npm run db:seed

import { db } from "./index";
import { etapes, ingredients, recettes } from "./schema";
import { recettesDeDepart } from "./seed-data";

async function main() {
  const ajoutees = await db.transaction(async (tx) => {
    const inserees = await tx
      .insert(recettes)
      .values(
        recettesDeDepart.map((r) => ({
          slug: r.slug,
          numero: r.numero,
          nom: r.nom,
          sousTitre: r.sousTitre,
          categorie: r.categorie,
          saison: r.saison,
          duree: r.duree,
          personnes: r.personnes,
          photo: r.photo,
          note: r.note,
        })),
      )
      .onConflictDoNothing()
      .returning({ id: recettes.id, slug: recettes.slug });

    for (const { id, slug } of inserees) {
      const recette = recettesDeDepart.find((r) => r.slug === slug)!;

      if (recette.ingredients.length > 0) {
        await tx.insert(ingredients).values(
          recette.ingredients.map((ingredient, index) => ({
            recetteId: id,
            ordre: index + 1,
            ...ingredient,
          })),
        );
      }

      if (recette.etapes.length > 0) {
        await tx.insert(etapes).values(
          recette.etapes.map((texte, index) => ({
            recetteId: id,
            ordre: index + 1,
            texte,
          })),
        );
      }
    }

    return inserees.length;
  });

  console.log(
    `${ajoutees} recette(s) ajoutée(s), ${recettesDeDepart.length - ajoutees} déjà présente(s).`,
  );
}

main()
  .catch((erreur) => {
    console.error(erreur);
    process.exitCode = 1;
  })
  .finally(() => db.$client.end());
