import { motion } from "framer-motion";

interface ProfileResultProps {
  onViewSuggestions: () => void;
}

export default function ProfileResult({ onViewSuggestions }: ProfileResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="profile-result text-center max-w-md mx-auto my-8 px-4"
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

      <button 
        className="btn-primary btn-pulse w-full md:max-w-sm mx-auto mt-10 py-4 px-8 rounded-full font-medium text-lg"
        onClick={onViewSuggestions}
      >
        Voir les suggestions de la Chef 🍽️
      </button>
    </motion.div>
  );
}
