/**
 * Configurações centralizadas da aplicação
 * Arquivo que contém todas as constantes, URLs e configurações importantes
 */

// Links externos
export const LINKS = {
  SALES: {
    BUY_URL: "https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10&bid=1745004292326&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR"
  }
};

// Cores principais da aplicação
export const COLORS = {
  PRIMARY: "#F27052",
  PRIMARY_DARK: "#A85544",
  PRIMARY_LIGHT: "#FDF8F5",
  SUCCESS: "#4CAF50",
  WARNING: "#FF9800",
  ERROR: "#F44336",
  INFO: "#2196F3",
  BACKGROUND: "#FFFFFF",
  TEXT: "#333333"
};

// Tempos de animações
export const ANIMATIONS = {
  TESTIMONIAL_AUTO_ADVANCE: 5000, // 5 segundos
  CAROUSEL_TRANSITION: 300, // 0.3 segundos
  MIN_SWIPE_DISTANCE: 50 // pixels
};

// Textos compartilhados
export const TEXTS = {
  QUIZ: {
    PROGRESS: "Étape {current} sur {total}",
    NEXT_BUTTON: "CONTINUER",
    TESTIMONIAL_SWIPE: "Faites glisser ➤ pour voir ce qu'elles disent."
  },
  SALES: {
    PRICE: {
      ORIGINAL: "34€",
      CURRENT: "17€",
      REMAINING: "Dernières 20 unités disponibles à 17€ seulement!"
    },
    BUY_BUTTON: "JE VEUX LE PACK POUR 17€",
    DELIVERY: "Livraison immédiate par e-mail. Sans abonnement. Sans engagement.",
    BONUSES: [
      {
        title: "🎁 Bonus 1 : Guide de substitutions intelligentes",
        description: "Remplacez sucre, farine ou lait sans perdre le goût."
      },
      {
        title: "🎁 Bonus 2 : Carte de satiété naturelle",
        description: "Construisez des assiettes qui rassasient sans excès."
      },
      {
        title: "🎁 Bonus 3 : Protocole intestin + glycémie",
        description: "Améliorez votre digestion et votre énergie au quotidien."
      },
      {
        title: "🎁 Bonus 4 : Liste de courses intelligente",
        description: "Gagnez du temps avec des produits simples, testés, validés."
      }
    ],
    CLOSING_TEXT: [
      "Ce n'est pas un régime.",
      "Ce n'est pas une promesse vide.",
      "C'est un raccourci vers ce que vous vouliez depuis des années :",
      "manger avec plaisir, sans douleur.",
      "Et aujourd'hui, ça vous coûte moins qu'un plat fade au resto."
    ]
  }
};