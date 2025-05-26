import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefImages } from "@/assets/imageExports";

// Componente de áudio simples e funcional
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Criar instância de áudio
    const audio = new Audio("/audio/message.mp3");
    audio.preload = "auto";
    
    const onCanPlayThrough = () => {
      console.log("Áudio pronto para reprodução");
      setIsLoaded(true);
      setHasError(false);
    };
    
    const onError = () => {
      console.error("Erro ao carregar áudio");
      setHasError(true);
      setIsLoaded(false);
    };
    
    const onPlay = () => {
      console.log("Áudio começou a tocar");
      setIsPlaying(true);
    };
    
    const onPause = () => {
      console.log("Áudio pausado");
      setIsPlaying(false);
    };
    
    const onEnded = () => {
      console.log("Áudio finalizado");
      setIsPlaying(false);
    };
    
    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    
    setAudioElement(audio);
    
    return () => {
      audio.removeEventListener("canplaythrough", onCanPlayThrough);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);
  
  const togglePlay = async () => {
    if (!audioElement || hasError) return;
    
    try {
      if (isPlaying) {
        audioElement.pause();
      } else {
        await audioElement.play();
      }
    } catch (e) {
      console.error("Erro na reprodução:", e);
      setHasError(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mb-5">
      <button 
        onClick={togglePlay}
        disabled={hasError}
        className={`${
          hasError 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#2476c7] hover:bg-[#1c64a9]'
        } text-white rounded-full w-16 h-16 flex items-center justify-center mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" fill="white"/>
            <rect x="14" y="4" width="4" height="16" fill="white"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z" fill="white"/>
          </svg>
        )}
      </button>
      
      <p className="text-sm text-gray-500 text-center">
        {hasError ? "Erreur de chargement audio" :
         isPlaying ? "Lecture en cours..." : 
         isLoaded ? "Cliquez pour écouter le message d'Amélie" : "Chargement..."}
      </p>
    </div>
  );
};

export default function ThankYou() {
  const [showButton, setShowButton] = useState(false);
  
  // Timer para mostrar o botão após 2 minutos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 120000); // 2 minutos
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="min-h-screen text-gray-800 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 px-4 py-8"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🎉 Merci pour votre participation !
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Votre profil gourmand est prêt ! Découvrez maintenant le message personnel d'Amélie pour vous.
          </p>
        </div>

        {/* Card principal */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
          <CardContent className="p-8">
            
            {/* Section Chef Amélie */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                <img 
                  src={ChefImages.amelie} 
                  alt="Chef Amélie Dupont"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Message de la Chef Amélie Dupont
              </h2>
              <p className="text-gray-600 mb-6">
                Elle a préparé un message spécialement pour vous !
              </p>
              
              {/* Player de áudio */}
              <AudioPlayer />
            </div>

            {/* Resultado do quiz */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🌟 Votre Profil Gourmand
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Objectif principal :</p>
                  <p className="text-gray-600">Améliorer votre digestion et réduire les ballonnements</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Style culinaire :</p>
                  <p className="text-gray-600">Recettes simples et nutritives</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Contraintes :</p>
                  <p className="text-gray-600">Sans gluten, sans lactose</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Recommandation :</p>
                  <p className="text-gray-600">Recettes anti-inflammatoires</p>
                </div>
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                🎯 Prochaines étapes
              </h3>
              <p className="text-gray-600 mb-6">
                Découvrez les 500 recettes personnalisées d'Amélie qui correspondent exactement à votre profil.
              </p>
              
              {/* Botão que aparece após 2 minutos */}
              {showButton && (
                <div className="space-y-4">
                  <Button 
                    className="bg-[#E07260] hover:bg-[#D66650] text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => window.open('https://chefamelie.com/livre-recettes', '_blank')}
                  >
                    🍽️ Découvrir mes recettes personnalisées
                  </Button>
                  <p className="text-xs text-gray-500">
                    Offre limitée - Accès immédiat au livre de recettes
                  </p>
                </div>
              )}
              
              {!showButton && (
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                  <p className="text-sm">Préparation de votre accès personnalisé...</p>
                </div>
              )}
            </div>

          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Chef Amélie Dupont - Recettes Santé & Bien-être</p>
        </div>
      </div>
    </div>
  );
}