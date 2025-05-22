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
      className="profile-result"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Votre profil gourmand :</h2>
      <h3 className="text-lg md:text-xl text-primary font-medium mb-6">La Curieuse Épicurienne</h3>

      <div className="space-y-4 text-[#555555]">
        <p>Vous êtes du genre à explorer de nouvelles saveurs, à tester des recettes inattendues et à faire plaisir sans culpabilité.</p>
        
        <p>Votre palais recherche l'équilibre entre le plaisir et le bien-être — sans sacrifier la gourmandise.</p>
        
        <p>Ce que la Chef Amélie a préparé pour vous est exactement ça : un univers de recettes qui allient textures, arômes et nutrition intelligente.</p>
      </div>

      <button 
        className="btn-primary w-full mt-8 flex items-center justify-center" 
        onClick={onViewSuggestions}
      >
        <span>Voir les suggestions de la Chef 👩‍🍳</span>
      </button>
    </motion.div>
  );
}
