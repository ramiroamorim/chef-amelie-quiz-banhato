import { motion } from "framer-motion";
import React from "react";

// Componente de botão pulsante coral
function CoralPulseButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div className="relative inline-block w-full mb-4">
      <div className="absolute inset-0 rounded-full opacity-30" 
        style={{
          background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
          animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
        }}
      ></div>
      <button 
        onClick={onClick}
        className="relative w-full py-4 px-8 rounded-full text-lg font-normal text-white"
        style={{ 
          background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
          boxShadow: "0 4px 15px rgba(224, 114, 96, 0.3)"
        }}
      >
        {children}
      </button>
    </div>
  );
};

interface ProfileResultProps {
  onViewSuggestions: () => void;
}

export default function ProfileResult({ onViewSuggestions }: ProfileResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="profile-result max-w-md mx-auto my-16 px-6"
    >
      <h2 className="text-2xl font-bold mb-2 text-primary">Votre profil gourmand :</h2>
      <h3 className="text-3xl font-normal text-[#333333] mb-10">La Curieuse Épicurienne</h3>

      <div className="space-y-10 text-[#333333] text-left">
        <p className="text-lg leading-relaxed">
          Vous êtes du genre à explorer de nouvelles saveurs, à tester des recettes inattendues et à faire plaisir sans culpabilité.
        </p>
        
        <p className="text-lg leading-relaxed">
          Votre palais recherche l'équilibre entre le plaisir et le bien-être — sans sacrifier la gourmandise.
        </p>
        
        <p className="text-lg leading-relaxed">
          Ce que la Chef Amélie a préparé pour vous est exactement ça : un univers de recettes qui allient textures, arômes et nutrition intelligente.
        </p>
      </div>

      <div className="mt-12">
        <CoralPulseButton onClick={onViewSuggestions}>
          Voir les suggestions de la Chef 🍽️
        </CoralPulseButton>
      </div>
    </motion.div>
  );
}
