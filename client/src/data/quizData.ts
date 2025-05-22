import { QuizStepType, TestimonialType } from "@/types";

export const quizSteps: QuizStepType[] = [
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
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
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
    textBlocks: [
      {
        content: `
          <div class="testimonial mb-8 relative">
            <div class="testimonial-content p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <p class="mb-2">
                Amélie... j'ai perdu 4kg sans faire de régime 😊<br>
                Juste en suivant vos recettes.<br>
                Je me sens plus légère, plus belle, plus MOI ❤️<br>
                Et je vous envoie la photo de mon moelleux au chocolat pour que vous voyiez 😋<br>
                Franchement... merci.
                <span class="text-xs text-gray-500">9:54PM</span>
              </p>
              
              <img src="https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" alt="Moelleux au chocolat" class="w-full h-auto rounded-lg">
              <span class="text-xs text-gray-500">9:54PM</span>
            </div>
          </div>

          <div class="pagination-controls flex justify-center items-center gap-2 mb-8">
            <button class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
              &#10094;
            </button>
            <button class="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              &#10095;
            </button>
          </div>
        `
      }
    ],
    buttonText: "🔍 DÉCOUVRIR MON PROFIL"
  }
];

export const testimonials: TestimonialType[] = [
  {
    message: "Amélie... j'ai perdu 4kg sans faire de régime 😊<br>Juste en suivant vos recettes.<br>Je me sens plus légère, plus belle, plus MOI ❤️<br>Et je vous envoie la photo de mon moelleux au chocolat pour que vous voyiez 😋<br>Franchement... merci.",
    time: "9:54PM",
    image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    imageAlt: "Moelleux au chocolat"
  },
  {
    message: "Ces recettes ont changé ma vie ! Plus de ballonnements, plus d'énergie, et je me sens enfin libre de manger ce que je veux sans souffrir après. Le brownie sans sucre est devenu mon dessert favori ! 🙏",
    time: "11:22AM",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    imageAlt: "Brownie sans sucre"
  }
];
