/**
 * Passos/etapas do quiz
 * Contém todas as perguntas e opções que o usuário verá durante o quiz
 */

import { QuizStepType } from "@/types/quiz";

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
    imageAlt: "Chef Amélie Dupont",
    buttonText: "COMMENCER"
  },
  
  // Step 1
  {
    name: "diet_type",
    title: "Quel type d'alimentation vous correspond le mieux ?",
    description: "Sélectionnez ce que vous suivez ou aimeriez suivre :",
    options: [
      { value: "everything", label: "Je mange de tout" },
      { value: "vegetarian", label: "Végétarien (pas de viande/poisson)" },
      { value: "flexitarian", label: "Flexitarien (peu de viande)" },
      { value: "vegan", label: "Vegan (aucun produit animal)" }
    ],
    buttonText: "CONTINUER"
  },
  
  // Step 2
  {
    name: "intolerance",
    title: "Avez-vous des intolérances alimentaires ?",
    description: "Sélectionnez tout ce qui s'applique :",
    options: [
      { value: "none", label: "Aucune intolérance connue" },
      { value: "gluten", label: "Gluten" },
      { value: "lactose", label: "Lactose / Produits laitiers" },
      { value: "sugar", label: "Sucre raffiné" }
    ],
    buttonText: "CONTINUER"
  },
  
  // Step 3
  {
    name: "cooking_time",
    title: "Combien de temps aimez-vous passer à cuisiner ?",
    description: "Pour un repas typique du quotidien :",
    options: [
      { value: "minimal", label: "Le minimum (<15 minutes)" },
      { value: "quick", label: "Rapide (15-30 minutes)" },
      { value: "moderate", label: "Modéré (30-60 minutes)" },
      { value: "hobbyist", label: "J'adore cuisiner (>60 minutes)" }
    ],
    buttonText: "CONTINUER"
  },
  
  // Step 4
  {
    name: "chef_profile",
    image: "/assets/images/recipes-main.png",
    imageAlt: "Chef Amélie Dupont",
    title: "Une rencontre avec la Cheffe Amélie Dupont",
    description: "Son histoire, sa mission, ses recettes.",
    textBlocks: [
      {
        content: "Bonjour, je suis Amélie. Chef professionnelle depuis 15 ans."
      },
      {
        content: "J'ai créé plus de 500 recettes <strong>sans gluten, sans lactose et sans sucre</strong> qui ont <em>changé la vie</em> de milliers de femmes."
      },
      {
        content: "Des recettes <strong>gourmandes</strong> et <strong>rassasiantes</strong>, sans frustration ni privation."
      },
      {
        content: "D'après vos réponses, j'ai identifié des recettes parfaites pour vous."
      }
    ],
    buttonText: "VOIR LES TÉMOIGNAGES"
  },
  
  // Step 5 - Testimonial step
  {
    name: "testimonials",
    isTestimonialStep: true,
    buttonText: "🔍 DÉCOUVRIR MON PROFIL"
  }
];