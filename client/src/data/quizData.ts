import { QuizStepType, TestimonialType } from "@/types";

// Image imports
// Definimos a URL da imagem do chef diretamente
const chefAmelie = "/recipe-grid.png";

// Usamos a mesma imagem para todos os testimonials por enquanto
const testimonial1 = "/testimonials/testimonial1.png";
const testimonial2 = "/testimonials/testimonial2.png";
const testimonial3 = "/testimonials/testimonial3.png";
const testimonial4 = "/testimonials/testimonial4.png";
const testimonial5 = "/testimonials/testimonial5.png";
const testimonial6 = "/testimonials/testimonial6.png";
const testimonial7 = "/testimonials/testimonial7.png";
const testimonial8 = "/testimonials/testimonial8.png";
const testimonial9 = "/testimonials/testimonial9.png";
const testimonial10 = "/testimonials/testimonial10.png";
const testimonial11 = "/testimonials/testimonial11.png";
const testimonial12 = "/testimonials/testimonial12.png";

export const quizSteps: QuizStepType[] = [
  // Step 0 - Landing Page
  {
    name: "landing",
    title: "On vous a menti.",
    textBlocks: [
      {
        content: "Vous pouvez manger un <strong>brownie fondant</strong>, une <strong>brioche moelleuse</strong>, ou une <strong>tartelette chocolat-noisette</strong> — <em>sans sucre, sans gluten, sans lactose.</em>"
      },
      {
        content: "Et vous resservir. Sans culpabilité."
      },
      {
        content: "🎁 En 1 minute, découvrez votre <strong>profil gourmand</strong> et accédez à la <em>collection privée</em> de 500 recettes emblématiques de la Chef Amélie."
      }
    ],
    image: "https://cdn.xquiz.co/images/94f2084a-557c-43be-abcc-2ba23141cb46",
    imageAlt: "Desserts sans sucre, sans gluten, sans lactose",
    buttonText: "Découvrir mon profil gourmand",
    footerText: "Plus de <strong>30 000 femmes</strong> ont déjà découvert le leur<br>Ce test ne prend que 60 secondes"
  },
  
  // Step 1
  {
    name: "discourage",
    title: "<span class='text-[#333333]'>Quand vous essayez de </span><span class='text-primary font-semibold'>manger plus sainement</span><span class='text-[#333333]'>... qu'est-ce qui vous </span><span class='text-primary font-semibold'>décourage</span><span class='text-[#333333]'> le plus ?</span>",
    options: [
      {
        value: "fades",
        label: "Les plats sont souvent fades ou secs"
      },
      {
        value: "faim",
        label: "J'ai encore faim après avoir mangé"
      },
      {
        value: "idees",
        label: "Je ne sais pas quoi cuisiner au quotidien"
      },
      {
        value: "abandon",
        label: "J'abandonne au bout de quelques jours"
      }
    ]
  },
  
  // Step 2
  {
    name: "dessert",
    title: "<span class='text-primary font-semibold'>Même sans sucre, sans gluten, sans lactose... </span><span class='text-[#333333]'>quelle de ces gourmandises vous donne le plus envie ?</span>",
    imageGrid: [
      {
        src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        alt: "Brownie fondant"
      },
      {
        src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        alt: "Brioche à la cannelle"
      },
      {
        src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        alt: "Tartelette chocolat-noisette"
      },
      {
        src: "https://images.unsplash.com/photo-1568471173242-461f0a730452?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        alt: "Baguette croustillante"
      }
    ],
    options: [
      {
        value: "brownie",
        label: "🍫 Brownie fondant encore tiède"
      },
      {
        value: "brioche",
        label: "🥐 Brioche moelleuse à la cannelle"
      },
      {
        value: "tartelette",
        label: "🥧 Tartelette chocolat-noisette"
      },
      {
        value: "baguette",
        label: "🥖 Baguette croustillante et chaude"
      }
    ]
  },
  
  // Step 3
  {
    name: "tried_recipes",
    title: "<span class='text-[#333333]'>Vous avez déjà essayé de suivre des </span><span class='text-primary font-semibold'>recettes \"saines\" </span><span class='text-[#333333]'>trouvées sur internet ?</span><br><span class='text-[#333333]'>Celles qui promettent tout... mais qui finissent </span><span class='text-primary font-semibold'>trop compliquées, trop fades </span><span class='text-[#333333]'>ou </span><span class='text-primary font-semibold'>complètement ratées </span><span class='text-[#333333]'>?</span>",
    options: [
      {
        value: "disappointed",
        label: "😔 Oui, j'ai essayé... et j'ai été déçue"
      },
      {
        value: "sometimes",
        label: "😐 J'ai essayé, parfois ça marche"
      },
      {
        value: "no_trust",
        label: "🧐 Non, je ne fais pas confiance aux recettes du net"
      }
    ]
  },
  
  // Step 4
  {
    name: "chef_profile",
    image: chefAmelie,
    imageAlt: "Chef Amélie Dupont",
    title: "Une rencontre avec la Cheffe Amélie Dupont",
    description: "Son histoire, sa mission, ses recettes.",
    textBlocks: [
      {
        content: "Née à Aix-en-Provence, Amélie Dupont a grandi entre les pains chauds, les herbes fraîches et les recettes familiales transmises par sa mère."
      },
      {
        content: "Formée à l'Institut Saint-Louis à Marseille, elle a travaillé dans des restaurants locaux engagés dans une cuisine naturelle et anti-inflammatoire."
      },
      {
        content: "Mais c'est après avoir elle-même découvert ses intolérances qu'elle décide de créer une nouvelle approche :"
      },
      {
        content: "Des recettes simples, gourmandes, sans sucre, sans gluten, sans lactose — et pleines de plaisir.",
        highlight: true
      },
      {
        content: "Aujourd'hui, elle partage plus de 500 recettes conçues pour transformer le quotidien de milliers de femmes."
      }
    ],
    buttonText: "🍽️ Voir comment ses recettes peuvent m'aider"
  },
  
  // Step 5
  {
    name: "improve",
    title: "<span class='text-primary font-semibold'>Qu'est-ce que vous aimeriez améliorer </span><span class='text-[#333333]'>en priorité aujourd'hui ?</span>",
    options: [
      {
        value: "digestion",
        label: "🥗 Réduire les ballonnements et améliorer ma digestion"
      },
      {
        value: "sugar",
        label: "🍬 Stabiliser ma glycémie et réduire les envies de sucre"
      },
      {
        value: "weight",
        label: "⚖️ Perdre du poids sans frustration ni régime extrême"
      },
      {
        value: "energy",
        label: "💪 Retrouver mon énergie et sortir de la fatigue chronique"
      },
      {
        value: "all",
        label: "🌱 Tout ça à la fois (et enfin me sentir bien dans mon corps)"
      }
    ]
  },
  
  // Step 6
  {
    name: "testimonials",
    title: "<span class='text-primary font-semibold'>Centaines de femmes </span><span class='text-[#333333]'>ont déjà testé ces recettes et vu leur corps se transformer.</span>",
    description: "<span class='text-primary'>Faites glisser ➤ pour voir ce qu'elles disent.</span>",
    isTestimonialStep: true,
    buttonText: "🔍 DÉCOUVRIR MON PROFIL"
  }
];

export const testimonials: TestimonialType[] = [
  {
    message: "Avant je me réveillais gonflée, fatiguée, perdue.<br>En 21 jours avec le Plan Express j'ai perdu 3,1kg, mes vêtements tombent mieux...<br>Mais surtout : je me sens en paix à table. C'est nouveau.",
    time: "",
    image: testimonial10,
    imageAlt: "Témoignage avec photos avant/après"
  },
  {
    message: "Je n'ai jamais eu autant de plaisir à cuisiner sans sucre 😍",
    time: "",
    image: testimonial9,
    imageAlt: "Témoignage cuisine sans sucre"
  },
  {
    message: "Je suis choquée...<br>Pas une seule fringale cette semaine.<br>J'ai mangé normalement, j'ai cuisiné rapide, et pourtant je me sens PLUS LÉGÈRE que jamais.<br>C'est la première fois que je ne culpabilise pas à table.",
    time: "",
    image: testimonial8,
    imageAlt: "Témoignage Le Plan Express"
  },
  {
    message: "Je peux enfin manger du sucré sans craindre pour ma glycémie. Je suis diabétique et c'est toujours compliqué de trouver des desserts qui soient bons et sans sucre. J'ai fait votre brownie et il était parfait. Juste sucré comme il faut, la texture nickel... Franchement, je ne pensais pas que c'était possible. Merci pour ces recettes!!! 🙏🙏🙏",
    time: "",
    image: testimonial3,
    imageAlt: "Témoignage brownie sans sucre pour diabétique"
  },
  {
    message: "Amelie, bonjour..... J'ai perdu 4 kilos sans même m'en rendre compte. J'ai pris votre livre pour manger plus sainement, et au final, ça m'a aussi aidée à perdre du poids. Les recettes sont rassasiantes et équilibrées, du coup j'ai arrêté de grignoter n'importe quoi. Maintenant, je mange bien, sans frustration, et je me sens mieux 🙏❤️❤️",
    time: "",
    image: testimonial4,
    imageAlt: "Témoignage perte de poids"
  },
  {
    message: "Mon fils m'a demandé de refaire les cookies du Plan Express. Avant il détestait mes recettes \"sans sucre\". Maintenant il dit que je cuisine comme une chef... ❤️ merci",
    time: "14:55",
    image: testimonial6,
    imageAlt: "Témoignage cookies sans sucre"
  },
  {
    message: "Vos recettes sont merveilleuses<br>Je digère mieux, je me sens plus légère... et je mange enfin avec plaisir.",
    time: "",
    image: testimonial11,
    imageAlt: "Témoignage digestion améliorée"
  },
  {
    message: "adorées !<br>Grâce à tes recettes, j'ai enfin trouvé l'équilibre. Je mange avec plaisir, je digère bien... et j'ai perdu 4 kg sans y penser.",
    time: "",
    image: testimonial7,
    imageAlt: "Témoignage équilibre alimentaire"
  },
  {
    message: "Chef, je ne sais pas comment vous remercier. J'ai toujours eu des problèmes digestifs et je pensais que c'était normal d'être ballonnée tout le temps. Depuis que j'ai testé quelques recettes de votre livre, mon transit va beaucoup mieux. Je me sens plus légère, et en plus, tout est vraiment bon. Je n'aurais jamais cru qu'une alimentation sans gluten et sans lactose pouvait être aussi gourmande. Merci.",
    time: "",
    image: testimonial5,
    imageAlt: "Témoignage problèmes digestifs résolus"
  },
  {
    message: "Salut chef! C'est Béatrice qui parle.... Mon fils est coeliaque et enfin, on mange tous la même chose. Avant, je faisais des plats à part pour lui, mais souvent, il n'aimait pas trop. Avec vos recettes, tout le monde mange pareil et adore. Le pain à la patate douce est devenu son préféré. Merci pour ces idées, ça change tout au quotidien.",
    time: "2:42 PM",
    image: testimonial2,
    imageAlt: "Témoignage coeliaque"
  },
  {
    message: "Amelie, bonsoir!! Franchement, je suis trop contente. Depuis que j'ai découvert mon intolérance au lactose, j'avais arrêté de faire des desserts parce que rien ne me plaisait vraiment. Mais hier, j'ai fait votre gâteau aux carottes et il était parfait. Moelleux, savoureux, et le glaçage sans sucre est trop bon. Ça fait plaisir de pouvoir se faire plaisir sans culpabiliser 🙏❤️",
    time: "7:46 PM",
    image: testimonial1,
    imageAlt: "Témoignage intolérance au lactose"
  },
  {
    message: "Je pensais devoir dire adieu au pain, mais grâce à vos recettes, j'en remange enfin!! J'ai toujours adoré le pain au petit-déj, mais depuis que j'ai arrêté le gluten, toutes les alternatives étaient sèches et fades. J'ai essayé votre pain à l'avoine et j'ai été bluffée par la texture et le goût. Il est moelleux et savoureux, même ma famille l'adore. Merci pour ce livre!!!! 😋❤️",
    time: "5:33 AM",
    image: testimonial12,
    imageAlt: "Témoignage pain sans gluten"
  }
];
