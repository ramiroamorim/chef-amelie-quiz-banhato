import { motion } from "framer-motion";
import React from "react";

// Componente de botão pulsante verde
const GreenPulseButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <div className="relative inline-block w-full md:w-auto mb-4">
      <div className="absolute inset-0 rounded-full bg-[#4CAF50] opacity-30" 
        style={{
          animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
        }}
      ></div>
      <a 
        href={href}
        target="_blank" 
        rel="noopener noreferrer"
        className="relative inline-block w-full md:w-auto py-4 px-10 text-lg font-bold rounded-full text-white"
        style={{ 
          background: "#4CAF50",
          boxShadow: "0 4px 10px rgba(76, 175, 80, 0.3)"
        }}
      >
        {children}
      </a>
    </div>
  );
};

export default function SalesPage() {
  // URL do botão de compra
  const buyUrl = "https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10&bid=1745004292326&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR";

  // Componente de imagem de receitas
  const RecipeGrid = () => (
    <div className="max-w-[500px] w-full">
      <img 
        src="/recipe-image.png" 
        alt="500 recettes sans sucre, sans gluten et sans lactose" 
        className="rounded-md w-full shadow-sm border border-gray-100"
      />
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[700px] mx-auto px-4 py-8 text-[#333]">
        <div className="bg-[#FDF8F5] p-6 rounded-md mb-8">
          <h1 className="text-2xl md:text-3xl font-normal text-[#A85544] mb-3">
            500 recettes sans sucre, sans gluten et sans lactose
            <br />
            <span className="block mt-3">qui nourrissent, font mincir avec plaisir</span>
            <span className="block mt-3">et rééquilibrent votre corps.</span>
          </h1>

          <div className="mt-6">
            <p className="mb-4">Pas de régime à la mode. Pas d'ingrédients impossibles à trouver. Pas de plats tristes.</p>
            <p className="mb-4">Seulement une cuisine <strong>vraie, savoureuse et libératrice</strong> — pour les femmes avec des restrictions qui veulent encore <strong>se régaler sans peur.</strong></p>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <RecipeGrid />
        </div>

        <div className="mb-8 bg-[#F1F9F1] p-6 rounded-md border-l-4 border-[#4CAF50]">
          <h3 className="text-xl font-bold text-[#4CAF50] mb-4">💚 Pour qui c'est:</h3>
          <ul className="list-none pl-1 space-y-3">
            <li>🌿 Femmes avec intolérances (gluten, lactose, sucre)</li>
            <li>🥗 Celles qui veulent mincir sans frustration</li>
            <li>😩 Celles fatiguées des plats tristes et sans goût</li>
            <li>✨ Celles qui veulent une méthode simple et durable</li>
          </ul>
        </div>

        <div className="mb-8 bg-[#FFF5F5] p-6 rounded-md border-l-4 border-[#F44336]">
          <h3 className="text-xl font-bold text-[#F44336] mb-4">🚫 Pour qui ce n'est pas:</h3>
          <ul className="list-none pl-1 space-y-3">
            <li>🙅‍♀️ Celles qui ne veulent pas changer leurs habitudes</li>
            <li>🧪 Celles qui cherchent une solution magique</li>
            <li>🌀 Celles qui préfèrent rester dans le désordre</li>
            <li>🍕 Celles qui refusent de cuisiner même un minimum</li>
          </ul>
        </div>

        <div className="mb-8 bg-[#FFF5F5] p-6 rounded-md border-l-4 border-[#A85544]">
          <p className="italic font-bold text-[#A85544] mb-3">Vous ne trouverez pas ces recettes sur Google.</p>
          <p className="mb-4 text-center">
            Elles sont nées dans la vraie cuisine d'Amélie — pas sur Pinterest, ni dans un blog copié-collé.
            Chaque plat a été pensé pour <strong>apaiser, nourrir</strong>… et redonner du <strong>plaisir</strong> à celles qui avaient renoncé.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <RecipeGrid />
        </div>

        <div className="mb-8 bg-[#F5F9FF] p-6 rounded-md border-l-4 border-[#2196F3]">
          <h2 className="text-2xl font-bold text-[#2196F3] mb-4">📦 Ce que vous allez recevoir :</h2>
          <p className="mb-4">Un accès à <span className="text-[#A85544] font-bold">500 recettes exclusives</span> créées et testées par la Cheffe Amélie — organisées pour nourrir, apaiser et régaler votre quotidien.</p>
          
          <ul className="list-none pl-1 mb-4 space-y-4">
            <li>🍽️ <span className="text-[#A85544] font-bold">100 petits-déjeuners & collations</span> — pour bien démarrer la journée, sans pic de sucre</li>
            <li>🥦 <span className="text-[#A85544] font-bold">300 déjeuners & dîners</span> — faciles, nourrissants et équilibrés, pour tous les jours</li>
            <li>🍫 <span className="text-[#A85544] font-bold">100 desserts gourmands</span> — sans sucre raffiné, mais pleins de plaisir</li>
            <li>🧭 <span className="text-[#A85544] font-bold">Recettes classées par objectif</span> : digestion, satiété, inflammation, énergie</li>
          </ul>
        </div>

        <div className="mb-8 bg-[#FFF8F0] p-6 rounded-md border-l-4 border-[#FF9800]">
          <h2 className="text-2xl font-bold text-[#FF9800] mb-4">🎁 Bonus exclusifs inclus aujourd'hui :</h2>
          
          <div className="space-y-5">
            <div>
              <p className="font-bold">🎁 Bonus 1 : Guide de substitutions intelligentes</p>
              <p className="ml-8">Remplacez sucre, farine ou lait sans perdre le goût.</p>
            </div>
            
            <div>
              <p className="font-bold">🎁 Bonus 2 : Carte de satiété naturelle</p>
              <p className="ml-8">Construisez des assiettes qui rassasient sans excès.</p>
            </div>
            
            <div>
              <p className="font-bold">🎁 Bonus 3 : Protocole intestin + glycémie</p>
              <p className="ml-8">Améliorez votre digestion et votre énergie au quotidien.</p>
            </div>
            
            <div>
              <p className="font-bold">🎁 Bonus 4 : Liste de courses intelligente</p>
              <p className="ml-8">Gagnez du temps avec des produits simples, testés, validés.</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="mb-2">Ce n'est pas un régime.</p>
          <p className="mb-4">Ce n'est pas une promesse vide.</p>
          <p className="mb-2">C'est un raccourci vers ce que vous vouliez depuis des années :</p>
          <p className="font-bold mb-4"><strong>manger avec plaisir, sans douleur.</strong></p>
          <p>Et aujourd'hui, ça vous coûte moins qu'un plat fade au resto.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <RecipeGrid />
        </div>

        <div className="py-6 px-6 text-center mb-8 bg-[#FDF8F5] rounded-lg">
          <p className="mb-1">Valeur réelle du pack : <span className="line-through">34€</span></p>
          <p className="text-2xl font-bold text-[#A85544] mb-4">Aujourd'hui : seulement 17€</p>
          <p className="font-bold text-[#F44336] mb-6">⚠️ Dernières 20 unités disponibles à 17€ seulement !</p>
          
          <GreenPulseButton href={buyUrl}>
            JE VEUX LE PACK POUR 17€
          </GreenPulseButton>
          
          <p className="text-sm">📩 Livraison immédiate par e-mail. Sans abonnement. Sans engagement.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <RecipeGrid />
        </div>

        <div className="py-6 px-6 text-center mb-8 bg-[#FDF8F5] rounded-lg">
          <p className="mb-1">Valeur réelle du pack : <span className="line-through">34€</span></p>
          <p className="text-2xl font-bold text-[#A85544] mb-4">Aujourd'hui : seulement 17€</p>
          <p className="font-bold text-[#F44336] mb-6">⚠️ Dernières 20 unités disponibles à 17€ seulement !</p>
          
          <GreenPulseButton href={buyUrl}>
            JE VEUX LE PACK POUR 17€
          </GreenPulseButton>
          
          <p className="text-sm">📩 Livraison immédiate par e-mail. Sans abonnement. Sans engagement.</p>
        </div>

        <div className="text-center mb-4">
          <p className="mb-4">Avec tout mon cœur — pour que vous puissiez enfin manger avec liberté et plaisir.</p>
          <p className="font-medium italic">Cheffe Amélie Dupont</p>
        </div>
      </div>
    </div>
  );
}