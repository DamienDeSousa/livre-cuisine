import Link from "next/link";
import { formatNumero, getRecettesParCategorie } from "@/lib/recettes";

export default async function Sommaire() {
  const categories = await getRecettesParCategorie();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <header className="mb-20 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Recettes &amp; rêveries
        </p>
        <h1 className="mt-4 font-serif text-5xl font-light italic sm:text-6xl">
          Carnet de cuisine
        </h1>
      </header>

      {categories.map(([categorie, recettes]) => (
        <section key={categorie} className="mb-16">
          <h2 className="mb-2 text-xs uppercase tracking-[0.3em] text-accent">
            {categorie}
          </h2>
          <ul className="border-t border-rule">
            {recettes.map((recette) => (
              <li key={recette.slug} className="border-b border-rule">
                <Link
                  href={`/recettes/${recette.slug}`}
                  className="group flex items-baseline gap-5 py-5"
                >
                  <span className="w-8 shrink-0 text-xs tabular-nums text-muted">
                    {formatNumero(recette.numero)}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-2xl italic transition-colors group-hover:text-accent">
                      {recette.nom}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {recette.sousTitre}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted">
                    {recette.duree} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
