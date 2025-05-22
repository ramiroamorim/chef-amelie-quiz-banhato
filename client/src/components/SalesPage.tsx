import { motion } from "framer-motion";
import recipeImage1 from "@assets/500 Receitas Chef Amelie Dupont.png";
import whatsappImage1 from "@assets/Imagem do WhatsApp.png";
import whatsappImage2 from "@assets/Imagem do WhatsApp (1).png";
import whatsappImage3 from "@assets/Imagem do WhatsApp (2).png";

export default function SalesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[700px] mx-auto px-4 py-8 text-[#333]">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            500 recettes sans sucre, sans gluten et sans lactose<br /> 
            qui nourrissent, font mincir avec plaisir<br />
            et rééquilibrent votre corps.
          </h1>

          <div className="my-6">
            <p className="mb-4">Pas de régime à la mode. Pas d'ingrédients impossibles à trouver. Pas de plats tristes.</p>
            <p className="mb-6">Seulement une cuisine <strong>vraie, savoureuse et libératrice</strong> — pour les femmes avec des restrictions qui veulent encore <strong>se régaler sans peur.</strong></p>
          </div>

          <div className="mb-8 flex justify-center">
            <img src={recipeImage1} alt="Recettes Chef Amélie Dupont" className="rounded-md w-full max-w-[500px]" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#4CAF50] mb-3">💚 Pour qui c'est:</h3>
          <ul className="list-none pl-1 mb-6 space-y-2">
            <li>🌿 Femmes avec intolérances (gluten, lactose, sucre)</li>
            <li>🥗 Celles qui veulent mincir sans frustration</li>
            <li>😩 Celles fatiguées des plats tristes et sans goût</li>
            <li>✨ Celles qui veulent une méthode simple et durable</li>
          </ul>

          <h3 className="text-xl font-bold text-[#F44336] mb-3">🚫 Pour qui ce n'est pas:</h3>
          <ul className="list-none pl-1 mb-6 space-y-2">
            <li>🙅‍♀️ Celles qui ne veulent pas changer leurs habitudes</li>
            <li>🧪 Celles qui cherchent une solution magique</li>
            <li>🌀 Celles qui préfèrent rester dans le désordre</li>
            <li>🍕 Celles qui refusent de cuisiner même un minimum</li>
          </ul>
        </div>

        <div className="mb-8">
          <p className="italic font-bold mb-3">Vous ne trouverez pas ces recettes sur Google.</p>
          <p className="mb-6">
            Elles sont nées dans la vraie cuisine d'Amélie — pas sur Pinterest, ni dans un blog copié-collé.
            Chaque plat a été pensé pour <strong>apaiser, nourrir</strong>… et redonner du <strong>plaisir</strong> à celles qui avaient renoncé.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <img src={whatsappImage1} alt="Chef Amélie Dupont" className="rounded-md w-full max-w-[500px]" />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2196F3] mb-3">📦 Ce que vous allez recevoir :</h2>
          <p className="mb-4">Un accès à 500 recettes exclusives créées et testées par la Cheffe Amélie — organisées pour nourrir, apaiser et régaler votre quotidien.</p>
          
          <ul className="list-none pl-1 mb-6 space-y-3">
            <li>🍽️ 100 petits-déjeuners & collations — pour bien démarrer la journée, sans pic de sucre</li>
            <li>🥦 300 déjeuners & dîners — faciles, nourrissants et équilibrés, pour tous les jours</li>
            <li>🍫 100 desserts gourmands — sans sucre raffiné, mais pleins de plaisir</li>
            <li>🧭 Recettes classées par objectif : digestion, satiété, inflammation, énergie</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#FF9800] mb-3">🎁 Bonus exclusifs inclus aujourd'hui :</h2>
          
          <div className="space-y-5">
            <div>
              <p className="font-bold">🎁 Bonus 1 : Guide de substitutions intelligentes</p>
              <p className="pl-6">Remplacez sucre, farine ou lait sans perdre le goût.</p>
            </div>
            
            <div>
              <p className="font-bold">🎁 Bonus 2 : Carte de satiété naturelle</p>
              <p className="pl-6">Construisez des assiettes qui rassasient sans excès.</p>
            </div>
            
            <div>
              <p className="font-bold">🎁 Bonus 3 : Protocole intestin + glycémie</p>
              <p className="pl-6">Améliorez votre digestion et votre énergie au quotidien.</p>
            </div>
            
            <div>
              <p className="font-bold">🎁 Bonus 4 : Liste de courses intelligente</p>
              <p className="pl-6">Gagnez du temps avec des produits simples, testés, validés.</p>
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
          <img src={whatsappImage2} alt="Exemples de recettes" className="rounded-md w-full max-w-[500px]" />
        </div>

        <div className="py-6 text-center mb-8">
          <p className="mb-1">Valeur réelle du pack :</p>
          <p className="line-through mb-1">34€</p>
          <p className="text-xl font-bold mb-4">Aujourd'hui : seulement 17€</p>
          <p className="font-bold text-red-500 mb-6">⚠️ Dernières 20 unités disponibles à 17€ seulement !</p>
          
          <a 
            href="https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10&bid=1745004292326&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary btn-pulse inline-block w-full md:w-auto py-4 px-8 text-lg font-bold rounded-full mb-4 text-white"
            style={{ 
              background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
              boxShadow: "0 4px 15px rgba(224, 114, 96, 0.3)"
            }}
          >
            JE VEUX LE PACK POUR 17€
          </a>
          
          <p className="text-sm">📩 Livraison immédiate par e-mail. Sans abonnement. Sans engagement.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <img src={whatsappImage3} alt="Exemples de recettes" className="rounded-md w-full max-w-[500px]" />
        </div>

        <div className="py-6 text-center mb-8">
          <p className="mb-1">Valeur réelle du pack :</p>
          <p className="line-through mb-1">34€</p>
          <p className="text-xl font-bold mb-4">Aujourd'hui : seulement 17€</p>
          <p className="font-bold text-red-500 mb-6">⚠️ Dernières 20 unités disponibles à 17€ seulement !</p>
          
          <a 
            href="https://pay.hotmart.com/D98080625O?off=1n1vmmyz&checkoutMode=10&bid=1745004292326&utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary btn-pulse inline-block w-full md:w-auto py-4 px-8 text-lg font-bold rounded-full mb-4 text-white"
            style={{ 
              background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
              boxShadow: "0 4px 15px rgba(224, 114, 96, 0.3)"
            }}
          >
            JE VEUX LE PACK POUR 17€
          </a>
          
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
