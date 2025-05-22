import { motion } from "framer-motion";

export default function SalesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sales-page max-w-md mx-auto my-8 px-4 text-center"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-[#333333]">Votre profil gourmand :</h2>
      <h3 className="text-2xl md:text-3xl text-primary font-bold mb-8">La Curieuse Épicurienne</h3>

      <div className="space-y-6 text-[#555555] text-center mb-10">
        <p className="leading-relaxed">
          Vous êtes du genre à explorer de nouvelles saveurs, à tester des recettes inattendues et à faire plaisir sans culpabilité.
        </p>
        
        <p className="leading-relaxed">
          Votre palais recherche l'équilibre entre le plaisir et le bien-être — sans sacrifier la gourmandise.
        </p>
        
        <p className="leading-relaxed">
          Ce que la Chef Amélie a préparé pour vous est exactement ça : un univers de recettes qui allient textures, arômes et nutrition intelligente.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-4">500 recettes sans sucre, sans gluten et sans lactose qui nourrissent, font mincir avec plaisir et rééquilibrent votre corps.</h2>

      <p className="mb-2">Pas de régime à la mode. Pas d'ingrédients impossibles à trouver. Pas de plats tristes.</p>

      <p className="mb-8 font-medium">Seulement une cuisine <strong>vraie, savoureuse et libératrice</strong> — pour les femmes avec des restrictions qui veulent encore <strong>se régaler sans peur.</strong></p>

      <div className="bg-gray-100 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold mb-4">💚 Pour qui c'est:</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <span className="mr-2">🌿</span>
            <span>Femmes avec intolérances (gluten, lactose, sucre)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🥗</span>
            <span>Celles qui veulent mincir sans frustration</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">😩</span>
            <span>Celles fatiguées des plats tristes et sans goût</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✨</span>
            <span>Celles qui veulent une méthode simple et durable</span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">🚫 Pour qui ce n'est pas:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🙅‍♀️</span>
            <span>Celles qui ne veulent pas changer leurs habitudes</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🧪</span>
            <span>Celles qui cherchent une solution magique</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🌀</span>
            <span>Celles qui préfèrent rester dans le désordre</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🍕</span>
            <span>Celles qui refusent de cuisiner même un minimum</span>
          </li>
        </ul>
      </div>

      <p className="italic mb-2">Vous ne trouverez pas ces recettes sur Google.</p>
      <p className="mb-8">Elles sont nées dans la vraie cuisine d'Amélie — pas sur Pinterest, ni dans un blog copié-collé. Chaque plat a été pensé pour <strong>apaiser, nourrir</strong>… et redonner du <strong>plaisir</strong> à celles qui avaient renoncé.</p>

      <h3 className="text-xl font-semibold mb-4">📦 Ce que vous allez recevoir :</h3>
      <p className="mb-4">Un accès à 500 recettes exclusives créées et testées par la Cheffe Amélie — organisées pour nourrir, apaiser et régaler votre quotidien.</p>

      <ul className="space-y-3 mb-8">
        <li className="flex items-start">
          <span className="mr-2">🍽️</span>
          <span>100 petits-déjeuners & collations — pour bien démarrer la journée, sans pic de sucre</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🥦</span>
          <span>300 déjeuners & dîners — faciles, nourrissants et équilibrés, pour tous les jours</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🍫</span>
          <span>100 desserts gourmands — sans sucre raffiné, mais pleins de plaisir</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">🧭</span>
          <span>Recettes classées par objectif : digestion, satiété, inflammation, énergie</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-4">🎁 Bonus exclusifs inclus aujourd'hui :</h3>
      <ul className="space-y-4 mb-8">
        <li>
          <p className="font-medium">🎁 Bonus 1 : Guide de substitutions intelligentes</p>
          <p className="text-sm text-[#555555]">Remplacez sucre, farine ou lait sans perdre le goût.</p>
        </li>
        <li>
          <p className="font-medium">🎁 Bonus 2 : Carte de satiété naturelle</p>
          <p className="text-sm text-[#555555]">Construisez des assiettes qui rassasient sans excès.</p>
        </li>
        <li>
          <p className="font-medium">🎁 Bonus 3 : Protocole intestin + glycémie</p>
          <p className="text-sm text-[#555555]">Améliorez votre digestion et votre énergie au quotidien.</p>
        </li>
        <li>
          <p className="font-medium">🎁 Bonus 4 : Liste de courses intelligente</p>
          <p className="text-sm text-[#555555]">Gagnez du temps avec des produits simples, testés, validés.</p>
        </li>
      </ul>

      <div className="text-center mb-8">
        <p className="mb-2">Ce n'est pas un régime.</p>
        <p className="mb-4">Ce n'est pas une promesse vide.</p>
        <p className="mb-2">C'est un raccourci vers ce que vous vouliez depuis des années :</p>
        <p className="font-semibold text-lg mb-4">manger avec plaisir, sans douleur.</p>
        <p>Et aujourd'hui, ça vous coûte moins qu'un plat fade au resto.</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl mb-8">
        <p className="text-sm text-gray-600 mb-1">Valeur réelle du pack :</p>
        <p className="text-lg font-medium line-through mb-2">34€</p>
        <p className="text-sm text-gray-600 mb-1">Aujourd'hui : seulement</p>
        <p className="text-2xl font-bold text-primary mb-4">17€</p>
        <p className="text-sm font-medium mb-6">⚠️ Dernières 20 unités disponibles à 17€ seulement !</p>
        <a href="#" className="btn-primary block text-center mb-2">
          JE VEUX LE PACK POUR 17€
        </a>
        <p className="text-xs text-center text-gray-500">📩 Livraison immédiate par e-mail. Sans abonnement. Sans engagement.</p>
      </div>

      <p className="text-center text-sm text-gray-600">Avec tout mon cœur — pour que vous puissiez enfin manger avec liberté et plaisir.</p>
      <p className="text-center font-medium">Cheffe Amélie Dupont</p>
    </motion.div>
  );
}
