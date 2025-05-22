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

      <a 
        href="https://chefameliedupont.xquiz.io/1m4t2k6q?utm_source=&utm_campaign=&utm_medium=&utm_content=&utm_term=&xcod=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR&sck=organichQwK21wXxRhQwK21wXxRhQwK21wXxRhQwK21wXxR"
        className="btn-primary btn-pulse w-full md:max-w-sm mx-auto mt-10 py-4 px-8 rounded-full font-medium text-lg block"
        target="_blank"
        rel="noopener noreferrer"
      >
        Voir les suggestions de la Chef 🍽️
      </a>
    </motion.div>
  );
}
