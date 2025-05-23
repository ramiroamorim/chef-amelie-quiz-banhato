import { motion } from "framer-motion";
import React from "react";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { RecipeCollage } from "@/components/recipe/RecipeCollage";
import { LINKS, COLORS, TEXTS } from "@/config";
import recipeBookImage from '@/assets/images/recipes/recipe-book.png';

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
          background: COLORS.SUCCESS,
          boxShadow: `0 4px 10px rgba(76, 175, 80, 0.3)`
        }}
      >
        {children}
      </a>
    </div>
  );
};

// Componente para exibir a seção de preço e botão de compra
const PriceSection = ({ buyUrl }: { buyUrl: string }) => (
  <div className="py-6 px-6 text-center mb-8 bg-[#FDF8F5] rounded-lg">
    <p className="mb-1">Valeur réelle du pack : <span className="line-through">{TEXTS.SALES.PRICE.ORIGINAL}</span></p>
    <p className="text-2xl font-bold text-[#A85544] mb-4">Aujourd'hui : seulement {TEXTS.SALES.PRICE.CURRENT}</p>
    <p className="font-bold text-[#F44336] mb-6">⚠️ {TEXTS.SALES.PRICE.REMAINING}</p>
    
    <GreenPulseButton href={buyUrl}>
      {TEXTS.SALES.BUY_BUTTON}
    </GreenPulseButton>
    
    <p className="text-sm">📩 {TEXTS.SALES.DELIVERY}</p>
  </div>
);

export default function SalesPage() {
  // Usando a URL do botão de compra do arquivo centralizado de configurações
  const buyUrl = LINKS.SALES.BUY_URL;

  // Componentes reutilizáveis para diversos elementos da página
  const RecipeContainer = ({ variant = 'grid' }: { variant?: 'grid' | 'book' }) => (
    <div className="max-w-[700px] w-full mx-auto">
      {variant === 'book' ? <RecipeGrid /> : <RecipeCollage variant="grid" />}
    </div>
  );
  
  // Container com borda colorida
  const ColorBorderCard = ({ 
    bgColor = "#F5F9FF", 
    borderColor = "#2196F3", 
    children 
  }: { 
    bgColor?: string, 
    borderColor?: string, 
    children: React.ReactNode 
  }) => (
    <div className={`mb-8 p-6 rounded-md border-l-4`} 
         style={{ backgroundColor: bgColor, borderColor: borderColor }}>
      {children}
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
          <RecipeContainer variant="grid" />
        </div>

        <ColorBorderCard bgColor="#F1F9F1" borderColor="#4CAF50">
          <h3 className="text-xl font-bold text-[#4CAF50] mb-4">💚 Pour qui c'est:</h3>
          <ul className="list-none pl-1 space-y-3">
            <li>🌿 Femmes avec intolérances (gluten, lactose, sucre)</li>
            <li>🥗 Celles qui veulent mincir sans frustration</li>
            <li>😩 Celles fatiguées des plats tristes et sans goût</li>
            <li>✨ Celles qui veulent une méthode simple et durable</li>
          </ul>
        </ColorBorderCard>

        <ColorBorderCard bgColor="#FFF5F5" borderColor="#F44336">
          <h3 className="text-xl font-bold text-[#F44336] mb-4">🚫 Pour qui ce n'est pas:</h3>
          <ul className="list-none pl-1 space-y-3">
            <li>🙅‍♀️ Celles qui ne veulent pas changer leurs habitudes</li>
            <li>🧪 Celles qui cherchent une solution magique</li>
            <li>🌀 Celles qui préfèrent rester dans le désordre</li>
            <li>🍕 Celles qui refusent de cuisiner même un minimum</li>
          </ul>
        </ColorBorderCard>

        <div className="bg-[#FDF1F1] p-6 rounded-lg mb-8 text-center">
          <p className="text-[#A85544] font-semibold text-xl mb-4">Vous ne trouverez pas ces recettes sur Google.</p>
          <p className="text-[#333333] text-lg">
            Elles sont nées dans la vraie cuisine d'Amélie — pas sur Pinterest, ni dans un blog copié-collé. Chaque plat a été pensé pour <span className="font-semibold">apaiser, nourrir</span>... et redonner du <span className="font-semibold">plaisir</span> à celles qui avaient renoncé.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <RecipeCollage variant="grid" />
        </div>

        <ColorBorderCard bgColor="#F5F9FF" borderColor="#2196F3">
          <h2 className="text-2xl font-bold text-[#2196F3] mb-4">📦 Ce que vous allez recevoir :</h2>
          <p className="mb-4">Un accès à <span className="text-[#A85544] font-bold">500 recettes exclusives</span> créées et testées par la Cheffe Amélie — organisées pour nourrir, apaiser et régaler votre quotidien.</p>
          
          <ul className="list-none pl-1 mb-4 space-y-4">
            <li>🍽️ <span className="text-[#A85544] font-bold">100 petits-déjeuners & collations</span> — pour bien démarrer la journée, sans pic de sucre</li>
            <li>🥦 <span className="text-[#A85544] font-bold">300 déjeuners & dîners</span> — faciles, nourrissants et équilibrés, pour tous les jours</li>
            <li>🍫 <span className="text-[#A85544] font-bold">100 desserts gourmands</span> — sans sucre raffiné, mais pleins de plaisir</li>
            <li>🧭 <span className="text-[#A85544] font-bold">Recettes classées par objectif</span> : digestion, satiété, inflammation, énergie</li>
          </ul>
        </ColorBorderCard>

        <ColorBorderCard bgColor="#FFF8F0" borderColor="#FF9800">
          <h2 className="text-2xl font-bold text-[#FF9800] mb-4">🎁 Bonus exclusifs inclus aujourd'hui :</h2>
          
          <div className="space-y-5">
            {TEXTS.SALES.BONUSES.map((bonus, index) => (
              <div key={index}>
                <p className="font-bold">{bonus.title}</p>
                <p className="ml-8">{bonus.description}</p>
              </div>
            ))}
          </div>
        </ColorBorderCard>

        <div className="text-center mb-8">
          {TEXTS.SALES.CLOSING_TEXT.map((text, index) => {
            // Destacamos a 4ª linha (índice 3) com negrito
            if (index === 3) {
              return <p key={index} className="font-bold mb-4"><strong>{text}</strong></p>;
            }
            // Espaçamento adequado para cada parágrafo
            const isSecondText = index === 1;
            return <p key={index} className={`mb-${isSecondText ? '4' : '2'}`}>{text}</p>;
          })}
        </div>

        <div className="mb-8 flex justify-center">
          <RecipeContainer variant="book" />
        </div>

        <PriceSection buyUrl={buyUrl} />

        <div className="mb-8 flex justify-center">
          <div className="max-w-[700px] w-full mx-auto p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
            <img 
              src={recipeBookImage} 
              alt="500 Recettes Délicieuses Sans Gluten, Sans Sucre, Sans Lactose"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <PriceSection buyUrl={buyUrl} />

        <div className="text-center mb-4">
          <p className="mb-4">Avec tout mon cœur — pour que vous puissiez enfin manger avec liberté et plaisir.</p>
          <p className="font-medium italic">Cheffe Amélie Dupont</p>
        </div>
      </div>
    </div>
  );
}
