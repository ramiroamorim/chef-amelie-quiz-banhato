import React from "react";
import { LINKS, COLORS, TEXTS } from "@/config";
import { ChefImages, RecipeImages, TestimonialImages } from '@/assets/imageExports';

// Componente de botão pulsante verde
const GreenPulseButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <div className="relative inline-block w-full md:w-auto mb-4">
      <div className="absolute inset-0 rounded-full bg-[#57C084] opacity-30" 
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
          background: "#57C084",
          boxShadow: `0 4px 10px rgba(87, 192, 132, 0.3)`
        }}
      >
        {children}
      </a>
    </div>
  );
};

// Componente para exibir a seção de preço e botão de compra
const PriceSection = ({ buyUrl }: { buyUrl: string }) => (
  <div className="py-6 px-6 text-center mb-8 bg-[#FFF5F5] rounded-lg border border-[#FFE5E5]">
    <p className="mb-1">Valeur réelle du pack : <span className="line-through">34€</span></p>
    <p className="text-2xl font-bold text-[#B34431] mb-4">Aujourd'hui : seulement 17€</p>
    <p className="font-bold text-[#F44336] mb-6">⚠️ Dernières 20 unités disponibles à 17€ seulement !</p>
    
    <GreenPulseButton href={buyUrl}>
      JE VEUX LE PACK POUR 17€
    </GreenPulseButton>
    
    <p className="text-sm">📩 Livraison immédiate par e-mail. Sans abonnement. Sans engagement.</p>
  </div>
);

export default function SalesPage() {
  // Usando a URL do botão de compra do arquivo centralizado de configurações
  const buyUrl = LINKS.SALES.BUY_URL;
  
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[500px] mx-auto px-4 py-8 text-[#333]">
        {/* Cabeçalho da página */}
        <div className="bg-[#FFF8F5] p-6 rounded-md mb-8">
          <h1 className="text-xl font-normal text-[#B34431] mb-3">
            <span className="block">500 recettes sans sucre, sans gluten et sans lactose</span>
            <span className="block mt-2">qui nourrissent, font mincir avec plaisir</span>
            <span className="block mt-2">et rééquilibrent votre corps.</span>
          </h1>

          <div className="mt-4">
            <p className="mb-2 text-sm">Pas de régime à la mode. Pas d'ingrédients impossibles à trouver. Pas de plats tristes.</p>
            <p className="mb-2 text-sm">Seulement une cuisine <strong>vraie, savoureuse et libératrice</strong> — pour les femmes avec des restrictions qui veulent encore <strong>se régaler sans peur.</strong></p>
          </div>
        </div>

        {/* Imagem única da grade de receitas conforme a referência */}
        <div className="mb-8 border border-gray-200 rounded-md overflow-hidden">
          <img 
            src={RecipeImages.gridCollage} 
            alt="Collection de recettes sans sucre, sans gluten et sans lactose"
            className="w-full h-auto"
          />
        </div>

        {/* Pour qui c'est: section */}
        <div className="mb-6 p-4 rounded-md border-l-4 bg-[#F1F9F1] border-[#57C084]">
          <h3 className="text-lg font-bold text-[#57C084] mb-2">💚 Pour qui c'est:</h3>
          <ul className="list-none pl-1 space-y-2 text-sm">
            <li>🌿 Femmes avec intolérances (gluten, lactose, sucre)</li>
            <li>🥗 Celles qui veulent mincir sans frustration</li>
            <li>😩 Celles fatiguées des plats tristes et sans goût</li>
            <li>✨ Celles qui veulent une méthode simple et durable</li>
          </ul>
        </div>

        {/* Pour qui ce n'est pas: section */}
        <div className="mb-6 p-4 rounded-md border-l-4 bg-[#FFF5F5] border-[#F44336]">
          <h3 className="text-lg font-bold text-[#F44336] mb-2">🚫 Pour qui ce n'est pas:</h3>
          <ul className="list-none pl-1 space-y-2 text-sm">
            <li>🙅‍♀️ Celles qui ne veulent pas changer leurs habitudes</li>
            <li>🧪 Celles qui cherchent une solution magique</li>
            <li>🌀 Celles qui préfèrent rester dans le désordre</li>
            <li>🍕 Celles qui refusent de cuisiner même un minimum</li>
          </ul>
        </div>

        {/* Recettes exclusives section */}
        <div className="bg-[#FFF8F5] p-4 rounded-md mb-6 text-center">
          <p className="text-[#B34431] font-semibold mb-2 text-lg italic">Vous ne trouverez pas ces recettes sur Google.</p>
          <p className="text-[#333333] text-sm">
            Elles sont nées dans la vraie cuisine d'Amélie — pas sur Pinterest, ni dans un blog copié-collé. Chaque plat a été pensé pour <span className="font-semibold">apaiser, nourrir</span>... et redonner du <span className="font-semibold">plaisir</span> à celles qui avaient renoncé.
          </p>
        </div>
        
        {/* Texto adicional conforme a referência */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm">Ce n'est pas un régime.</p>
          <p className="mb-2 text-sm">Ce n'est pas une promesse vide.</p>
          <p className="mb-4 text-sm">C'est un raccourci vers ce que vous vouliez depuis des années : <strong>manger avec plaisir, sans douleur.</strong></p>
          <p className="mb-2 text-sm">Et aujourd'hui, ça vous coûte moins qu'un plat fade au resto.</p>
        </div>

        {/* Imagem do livro de receitas */}
        <div className="mb-6 border border-gray-200 rounded-md overflow-hidden">
          <img 
            src={RecipeImages.book} 
            alt="Livre de recettes Chef Amélie Dupont"
            className="w-full h-auto"
          />
        </div>

        {/* Ce que vous allez recevoir section */}
        <div className="mb-6 p-4 rounded-md border-l-4 bg-[#F5F9FF] border-[#2196F3]">
          <h2 className="text-lg font-bold text-[#2196F3] mb-2">📦 Ce que vous allez recevoir :</h2>
          <p className="mb-2 text-sm">Un accès à <span className="text-[#B34431] font-bold">500 recettes exclusives</span> créées et testées par la Cheffe Amélie — organisées pour nourrir, apaiser et régaler votre quotidien.</p>
          
          <ul className="list-none pl-1 mb-2 space-y-3 text-sm">
            <li>🍽️ <span className="text-[#B34431] font-bold">100 petits-déjeuners & collations</span> — pour bien démarrer la journée, sans pic de sucre</li>
            <li>🥦 <span className="text-[#B34431] font-bold">300 déjeuners & dîners</span> — faciles, nourrissants et équilibrés, pour tous les jours</li>
            <li>🍫 <span className="text-[#B34431] font-bold">100 desserts gourmands</span> — sans sucre raffiné, mais pleins de plaisir</li>
            <li>🧭 <span className="text-[#B34431] font-bold">Recettes classées par objectif</span> : digestion, satiété, inflammation, énergie</li>
          </ul>
        </div>



        {/* Bonus exclusifs section */}
        <div className="mb-6 p-4 rounded-md border-l-4 bg-[#FFF8E8] border-[#FF9800]">
          <h2 className="text-lg font-bold text-[#FF9800] mb-2">🎁 Bonus exclusifs inclus aujourd'hui :</h2>
          
          <ul className="list-none pl-0 space-y-3 text-sm">
            <li>
              <p className="font-bold">🎁 Bonus 1 : Guide de substitutions intelligentes</p>
              <p className="ml-5">Remplacez sucre, farine ou lait sans perdre le goût.</p>
            </li>
            <li>
              <p className="font-bold">🎁 Bonus 2 : Carte de satiété naturelle</p>
              <p className="ml-5">Construisez des assiettes qui rassasient sans excès.</p>
            </li>
            <li>
              <p className="font-bold">🎁 Bonus 3 : Protocole intestin + glycémie</p>
              <p className="ml-5">Améliorez votre digestion et votre énergie au quotidien.</p>
            </li>
            <li>
              <p className="font-bold">🎁 Bonus 4 : Liste de courses intelligente</p>
              <p className="ml-5">Gagnez du temps avec des produits simples, testés, validés.</p>
            </li>
          </ul>
        </div>

        {/* Imagem pessoa segurando telefone/tablet */}
        <div className="mb-6 border border-gray-200 rounded-md overflow-hidden">
          <img 
            src={RecipeImages.grid} 
            alt="Client avec les recettes sur son téléphone"
            className="w-full h-auto"
          />
        </div>

        {/* Seção de preço e compra */}
        <PriceSection buyUrl={buyUrl} />

        {/* Mensagens de WhatsApp simuladas com fotos de receitas */}
        <div className="mb-6">
          <div className="max-w-[85%] bg-[#e2f7cb] p-3 rounded-lg mb-4 ml-auto">
            <p className="text-sm mb-2">C'est tellement bon tout ce que j'ai essayé. Le pain sans gluten est incroyable... mes enfants adorent et mon mari ne voit même pas la différence! 😍</p>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={RecipeImages.recipes} 
                alt="Pain sans gluten fait maison" 
                className="w-full h-auto" 
              />
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">10:45</p>
          </div>
          
          <div className="max-w-[85%] bg-[#e2f7cb] p-3 rounded-lg mb-4 ml-auto">
            <p className="text-sm mb-2">Amélie - j'ai perdu 3kg cette semaine grâce aux recettes légères que tu m'as envoyé, je me sens tellement mieux et plus d'énergie! Le brownie sans sucre est DÉLICIEUX 😋</p>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={RecipeImages.collage} 
                alt="Brownie sans sucre" 
                className="w-full h-auto" 
              />
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">14:22</p>
          </div>
        </div>

        {/* Seção final de preço e compra */}
        <PriceSection buyUrl={buyUrl} />

        {/* Assinatura da Chef */}
        <div className="text-center mb-4">
          <p className="mb-2 text-sm">Avec tout mon cœur — pour que vous puissiez enfin manger avec liberté et plaisir.</p>
          <p className="font-medium italic text-sm">Cheffe Amélie Dupont</p>
        </div>
      </div>
    </div>
  );
}
