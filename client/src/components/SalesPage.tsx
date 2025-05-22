import React from "react";
import recipeImage1 from "@assets/500 Receitas Chef Amelie Dupont.png";
import whatsappImage1 from "@assets/Imagem do WhatsApp.png";
import whatsappImage2 from "@assets/Imagem do WhatsApp (1).png";
import whatsappImage3 from "@assets/Imagem do WhatsApp (2).png";

// Componente de botão verde simplificado
function GreenPulseButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className="relative inline-block w-full md:w-auto py-4 px-10 mb-4 text-lg font-bold rounded-full text-white"
      style={{ 
        background: "#4CAF50",
        boxShadow: "0 4px 10px rgba(76, 175, 80, 0.3)"
      }}
    >
      {children}
    </a>
  );
}

export default function SalesPage() {
  // URL do botão de compra
  const buyUrl = "https://hotm.art/TKMFrDw";

  return (
    <div className="sales-page">
      <div className="hero-section bg-[#FDF8F5] py-12 md:py-16 text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#333333]">
          500 Recettes Gourmandes <br className="hidden md:block" />
          <span className="text-primary">Pour Une Alimentation Intuitive</span>
        </h1>
        
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Le Guide Complet pour Savourer des Plats Délicieux
        </p>
        
        <img 
          src={recipeImage1} 
          alt="500 Recettes Chef Amélie Dupont" 
          className="max-w-sm mx-auto mb-8"
        />
        
        <div className="mb-12">
          <GreenPulseButton href={buyUrl}>
            Oui, Je Veux Ces 500 Recettes !
          </GreenPulseButton>
        </div>
      </div>
      
      {/* Section: Pour qui c'est */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Pour qui c'est ?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Carte 1 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#4CAF50] shadow-md">
              <h3 className="font-bold text-lg mb-3">Les personnes qui veulent...</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#4CAF50] mr-2">✓</span>
                  <span>Manger sainement sans se prendre la tête</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4CAF50] mr-2">✓</span>
                  <span>Découvrir des recettes rapides et délicieuses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4CAF50] mr-2">✓</span>
                  <span>Se réconcilier avec la cuisine</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#4CAF50] mr-2">✓</span>
                  <span>Sortir de la routine alimentaire</span>
                </li>
              </ul>
            </div>
            
            {/* Carte 2 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#E05B2D] shadow-md">
              <h3 className="font-bold text-lg mb-3">Ce n'est PAS pour ceux qui...</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#E05B2D] mr-2">✗</span>
                  <span>Recherchent un régime restrictif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E05B2D] mr-2">✗</span>
                  <span>Veulent des recettes compliquées et longues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E05B2D] mr-2">✗</span>
                  <span>N'aiment pas essayer de nouvelles saveurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E05B2D] mr-2">✗</span>
                  <span>Préfèrent les plats industriels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section: Ce qu'en disent nos clients */}
      <div className="py-12 px-4 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center">Ce qu'en disent nos clients</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Témoignage 1 */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="mb-4">
                <img 
                  src={whatsappImage1} 
                  alt="Témoignage client" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500">Sandrine P.</p>
            </div>
            
            {/* Témoignage 2 */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="mb-4">
                <img 
                  src={whatsappImage2} 
                  alt="Témoignage client" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500">Mathieu L.</p>
            </div>
            
            {/* Témoignage 3 */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="mb-4">
                <img 
                  src={whatsappImage3} 
                  alt="Témoignage client" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500">Claire D.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section: Tout ce que vous recevrez */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Tout ce que vous recevrez</h2>
          
          <div className="space-y-6">
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">✨ 500 Recettes Complètes</h3>
              <p>Un guide PDF complet avec 500 recettes organisées par catégories pour tous les moments de la journée.</p>
            </div>
            
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">✨ Listes de Courses</h3>
              <p>Des listes de courses prêtes à l'emploi pour chaque semaine, pour vous faire gagner du temps.</p>
            </div>
            
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">✨ Conseils Nutritionnels</h3>
              <p>Des astuces et conseils pour adapter les recettes à vos besoins spécifiques.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section: Prix et garantie */}
      <div className="py-12 px-4 bg-[#FDF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Prix Spécial Aujourd'hui</h2>
          <p className="mb-6">Seulement pour les personnes ayant complété le quiz</p>
          
          <div className="price-box mb-8">
            <p className="text-lg mb-2"><s>97€</s></p>
            <p className="text-3xl font-bold text-primary mb-4">39€</p>
            <p className="text-sm mb-8">Offre à durée limitée</p>
            
            <GreenPulseButton href={buyUrl}>
              Obtenir Mes 500 Recettes Maintenant
            </GreenPulseButton>
          </div>
          
          <div className="guarantee text-sm text-gray-600 max-w-md mx-auto">
            <p>
              Garantie satisfait ou remboursé pendant 30 jours.
              Si vous n'êtes pas satisfait(e), contactez-nous pour un remboursement intégral.
            </p>
          </div>
        </div>
      </div>
      
      {/* Section: FAQ */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Questions Fréquentes</h2>
          
          <div className="space-y-6">
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Sous quel format sont les recettes ?</h3>
              <p>Vous recevrez un PDF complet, organisé par catégories et facile à consulter sur tous vos appareils.</p>
            </div>
            
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Les recettes sont-elles compliquées ?</h3>
              <p>Non, toutes les recettes sont conçues pour être simples et rapides à réaliser, même pour les débutants.</p>
            </div>
            
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Comment accéder aux recettes après l'achat ?</h3>
              <p>Vous recevrez un email avec un lien de téléchargement instantané après votre achat.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section finale - Call to action */}
      <div className="py-12 px-4 bg-[#FDF8F5] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Prête à transformer votre cuisine ?</h2>
          
          <GreenPulseButton href={buyUrl}>
            Oui, Je Veux Ces 500 Recettes !
          </GreenPulseButton>
          
          <p className="mt-6 text-sm text-gray-600">
            Accès immédiat après l'achat. Paiement 100% sécurisé.
          </p>
        </div>
      </div>
    </div>
  );
}