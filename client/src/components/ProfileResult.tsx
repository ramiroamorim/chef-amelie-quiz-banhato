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
      className="profile-result text-center"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-2">Votre profil gourmand :</h2>
      <h3 className="text-lg md:text-xl text-primary font-semibold mb-6">La Curieuse Épicurienne</h3>

      <div className="space-y-5 text-[#555555] text-left">
        <p>Vous êtes du genre à explorer de nouvelles saveurs, à tester des recettes inattendues et à faire plaisir sans culpabilité.</p>
        
        <p>Votre palais recherche l'équilibre entre le plaisir et le bien-être — sans sacrifier la gourmandise.</p>
        
        <p>Ce que la Chef Amélie a préparé pour vous est exactement ça : un univers de recettes qui allient textures, arômes et nutrition intelligente.</p>
      </div>

      <button 
        className="btn-primary w-full mt-8 py-4 font-medium text-lg"
        onClick={onViewSuggestions}
      >
        Voir les suggestions de la Chef 🍽️
      </button>
    </motion.div>
  );
}
