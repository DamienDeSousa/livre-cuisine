import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatNumero, getRecette, getRecettes } from "@/lib/recettes";

export function generateStaticParams() {
  return getRecettes().map((recette) => ({ slug: recette.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/recettes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recette = getRecette(slug);
  if (!recette) return {};
  return { title: recette.nom, description: recette.sousTitre };
}

export default async function PageRecette({
  params,
}: PageProps<"/recettes/[slug]">) {
  const { slug } = await params;
  const recette = getRecette(slug);
  if (!recette) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-20">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent"
      >
        ← Sommaire
      </Link>

      <article className="mt-12">
        <div className="flex items-baseline justify-between pb-4 text-xs uppercase tracking-[0.2em] text-muted">
          <span>
            N° {formatNumero(recette.numero)} · {recette.categorie}
          </span>
          <span className="tabular-nums">
            {recette.duree} min · {recette.personnes} pers.
          </span>
        </div>

        <header className="border-y border-rule py-10">
          <h1 className="font-serif text-5xl font-light italic leading-tight sm:text-6xl">
            {recette.nom}
          </h1>
          <p className="mt-4 text-lg text-muted">{recette.sousTitre}</p>
        </header>

        {recette.photo && (
          <div className="relative mt-10 aspect-[3/2] w-full overflow-hidden">
            <Image
              src={recette.photo}
              alt={recette.sousTitre}
              fill
              sizes="(min-width: 896px) 848px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-0">
          <section className="md:border-r md:border-rule md:pr-10">
            <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
              Ingrédients
            </h2>
            <ul className="space-y-3">
              {recette.ingredients.map((ingredient) => (
                <li key={ingredient.nom} className="leading-snug">
                  {ingredient.quantite && (
                    <span className="tabular-nums">
                      {ingredient.quantite}{" "}
                    </span>
                  )}
                  <span className="text-muted">{ingredient.nom}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:pl-10">
            <h2 className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
              Préparation
            </h2>
            <ol className="space-y-6">
              {recette.etapes.map((etape, index) => (
                <li key={index} className="flex gap-5">
                  <span className="font-serif text-xl italic tabular-nums text-accent">
                    {formatNumero(index + 1)}
                  </span>
                  <p className="pt-1 leading-relaxed">{etape}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {recette.note && (
          <footer className="mt-16 border-t border-rule pt-8 text-center">
            <p className="font-serif text-xl italic text-muted">
              « {recette.note} »
            </p>
          </footer>
        )}
      </article>
    </main>
  );
}
