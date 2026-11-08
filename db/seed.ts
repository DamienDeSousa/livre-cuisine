// Remplit la base avec les recettes de départ, seulement si elle est vide :
// une recette supprimée ensuite ne réapparaît donc pas au déploiement suivant.
// Usage : npm run db:seed (lancé aussi à chaque build de production Vercel)

import { db } from "./index";
import { etapes, ingredients, recettes } from "./schema";
import { recettesDeDepart } from "./seed-data";

async function main() {
  if ((await db.$count(recettes)) > 0) {
    console.log("Base déjà remplie : seed ignoré.");
    return;
  }

  await db.transaction(async (tx) => {
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
  });

  console.log(`${recettesDeDepart.length} recettes de départ ajoutées.`);
}

main()
  .catch((erreur) => {
    console.error(erreur);
    process.exitCode = 1;
  })
  .finally(() => db.$client.end());
