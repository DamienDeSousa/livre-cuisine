import type { Recette } from "@/lib/recettes";

// Recettes chargées par `npm run db:seed`.
export const recettesDeDepart: Recette[] = [
  {
    slug: "jardin-sous-la-pluie",
    numero: 1,
    nom: "Le Jardin sous la pluie",
    sousTitre: "Carottes rôties au cumin, yaourt et agrumes",
    categorie: "Entrées",
    saison: "Printemps",
    duree: 40,
    personnes: 4,
    photo: null,
    ingredients: [
      { quantite: "8", nom: "carottes fanes" },
      { quantite: "1 c.c.", nom: "cumin en grains" },
      { quantite: "2 c.s.", nom: "huile d'olive" },
      { quantite: "150 g", nom: "yaourt grec" },
      { quantite: "1", nom: "orange" },
      { quantite: "½", nom: "citron" },
      { quantite: "", nom: "fleur de sel, poivre" }
    ],
    etapes: [
      "Préchauffer le four à 200 °C. Laver les carottes sans les éplucher et garder un centimètre de fanes.",
      "Torréfier le cumin à sec dans une poêle une minute, puis l'écraser grossièrement.",
      "Enrober les carottes d'huile, de cumin et de sel. Rôtir 25 minutes jusqu'à ce qu'elles soient tendres et légèrement caramélisées.",
      "Mélanger le yaourt avec le zeste et le jus du demi-citron.",
      "Étaler le yaourt sur un plat, déposer les carottes tièdes et finir avec des suprêmes d'orange et un filet d'huile."
    ],
    note: "Servir tiède : le contraste avec le yaourt froid fait tout."
  },
  {
    slug: "neige-davril",
    numero: 2,
    nom: "Neige d'avril",
    sousTitre: "Fromage frais battu, citron et aneth, pain grillé",
    categorie: "Entrées",
    saison: "Printemps",
    duree: 15,
    personnes: 4,
    photo: null,
    ingredients: [
      { quantite: "250 g", nom: "fromage frais de chèvre" },
      { quantite: "3 c.s.", nom: "crème fraîche" },
      { quantite: "1", nom: "citron non traité" },
      { quantite: "½ botte", nom: "aneth" },
      { quantite: "4 tranches", nom: "pain de campagne" }
    ],
    etapes: [
      "Fouetter le fromage frais et la crème jusqu'à obtenir une texture aérienne.",
      "Ajouter le zeste du citron, un trait de jus et l'aneth ciselé. Saler, poivrer.",
      "Griller le pain et le frotter d'un filet d'huile.",
      "Dresser la neige en quenelles généreuses sur le pain encore chaud."
    ],
    note: null
  },
  {
    slug: "foret-apres-lorage",
    numero: 3,
    nom: "La Forêt après l'orage",
    sousTitre: "Risotto aux champignons des bois et parmesan",
    categorie: "Plats",
    saison: "Automne",
    duree: 45,
    personnes: 4,
    photo: null,
    ingredients: [
      { quantite: "300 g", nom: "riz arborio" },
      { quantite: "400 g", nom: "champignons des bois" },
      { quantite: "1", nom: "échalote" },
      { quantite: "10 cl", nom: "vin blanc sec" },
      { quantite: "1 L", nom: "bouillon de légumes chaud" },
      { quantite: "60 g", nom: "parmesan râpé" },
      { quantite: "40 g", nom: "beurre froid" },
      { quantite: "", nom: "persil plat" }
    ],
    etapes: [
      "Poêler les champignons à feu vif avec une noisette de beurre. Saler et réserver.",
      "Faire suer l'échalote ciselée, ajouter le riz et le nacrer deux minutes.",
      "Déglacer au vin blanc et laisser absorber.",
      "Ajouter le bouillon louche par louche en remuant, pendant 18 minutes environ.",
      "Hors du feu, incorporer le beurre froid et le parmesan, puis les champignons. Couvrir deux minutes avant de servir avec le persil."
    ],
    note: "Le riz doit onduler dans l'assiette, comme une vague."
  },
  {
    slug: "heure-doree",
    numero: 4,
    nom: "L'Heure dorée",
    sousTitre: "Abricots rôtis au miel et romarin",
    categorie: "Desserts",
    saison: "Été",
    duree: 30,
    personnes: 4,
    photo: null,
    ingredients: [
      { quantite: "8", nom: "abricots bien mûrs" },
      { quantite: "3 c.s.", nom: "miel de lavande" },
      { quantite: "2 brins", nom: "romarin" },
      { quantite: "20 g", nom: "beurre demi-sel" },
      { quantite: "", nom: "crème crue, pour servir" }
    ],
    etapes: [
      "Préchauffer le four à 180 °C.",
      "Couper les abricots en deux, retirer les noyaux et les disposer face bombée vers le bas dans un plat.",
      "Parsemer de copeaux de beurre, arroser de miel et glisser le romarin entre les fruits.",
      "Rôtir 20 minutes en arrosant à mi-cuisson avec le jus.",
      "Servir tiède avec une cuillère de crème crue."
    ],
    note: null
  },
  {
    slug: "nuit-de-velours",
    numero: 5,
    nom: "Nuit de velours",
    sousTitre: "Mousse au chocolat noir et fleur de sel",
    categorie: "Desserts",
    saison: "Hiver",
    duree: 20,
    personnes: 6,
    photo: null,
    ingredients: [
      { quantite: "200 g", nom: "chocolat noir 70 %" },
      { quantite: "6", nom: "œufs" },
      { quantite: "30 g", nom: "sucre" },
      { quantite: "1 pincée", nom: "fleur de sel" }
    ],
    etapes: [
      "Faire fondre le chocolat au bain-marie et le laisser tiédir.",
      "Séparer les blancs des jaunes. Incorporer les jaunes un à un au chocolat.",
      "Monter les blancs en neige, serrer avec le sucre.",
      "Incorporer délicatement les blancs au chocolat en trois fois, sans les casser.",
      "Répartir en verrines et réserver au frais au moins quatre heures. Une pincée de fleur de sel au moment de servir."
    ],
    note: "À préparer la veille : la nuit lui va bien."
  }
];
