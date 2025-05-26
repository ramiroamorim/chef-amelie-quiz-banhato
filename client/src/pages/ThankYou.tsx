import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefImages } from "@/assets/imageExports";

// Player de áudio completamente reescrito para funcionar corretamente
const SimpleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Inicializar o áudio
  useEffect(() => {
    // Criar elemento de áudio
    const audio = new Audio('/audio/message.mp3');
    audioRef.current = audio;
    
    // Configurações do áudio
    audio.preload = 'auto';
    audio.volume = 1.0;
    
    // Event listeners
    const onLoadedMetadata = () => {
      console.log('Áudio carregado - duração:', audio.duration);
      setDuration(audio.duration);
      setIsReady(true);
    };
    
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const onPlay = () => {
      console.log('Áudio iniciado');
      setIsPlaying(true);
    };
    
    const onPause = () => {
      console.log('Áudio pausado');
      setIsPlaying(false);
    };
    
    const onEnded = () => {
      console.log('Áudio finalizado');
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const onError = (e: any) => {
      console.error('Erro no áudio:', e);
      setIsReady(false);
    };
    
    // Adicionar listeners
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    
    // Forçar carregamento
    audio.load();
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);
  
  // Função para controlar play/pause
  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !isReady) {
      console.log('Áudio não está pronto');
      return;
    }
    
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error('Erro ao controlar áudio:', error);
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full mb-5">
      <button 
        onClick={togglePlayback}
        disabled={!isReady}
        className={`${
          !isReady 
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
        {!isReady ? "Chargement..." :
         isPlaying ? `Lecture en cours... ${Math.floor(currentTime)}s/${Math.floor(duration)}s` : 
         "Cliquez pour écouter le message d'Amélie"}
      </p>
    </div>
  );
};

export default function ThankYou() {
  const [showButton, setShowButton] = useState(false);
  
  // Timer para mostrar o botão após exatamente 2 minutos (120000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 120000); // 2 minutos

    return () => clearTimeout(timer);
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Error loading asset:", e);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Imagem principal de agradecimento */}
        <div className="w-full mb-8">
          <img 
            src="/images/whatsapp-screenshot.png" 
            alt="Message de remerciement d'Amélie"
            className="w-full h-auto rounded-lg shadow-lg"
            onError={handleError}
          />
        </div>

        {/* Título e texto de agradecimento */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#B34431] mb-4">
            Merci et bienvenue !
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Félicitations ! Vous venez de rejoindre des milliers de femmes qui transforment leur quotidien grâce aux recettes d'Amélie.
          </p>
          <p className="text-lg text-gray-600">
            Votre livre "500 Recettes Anti-Inflammatoires" vous attend dans votre boîte email.
          </p>
        </div>

        {/* Player de áudio - design moderno similar à referência */}
        <Card className="w-full mb-10 overflow-hidden bg-[#f8f9fa] border border-[#e9ecef] shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-[#B34431] text-lg">Chef Amélie Dupont</p>
              {ChefImages && ChefImages.amelie ? (
                <img 
                  src={ChefImages.amelie} 
                  alt="Chef Amélie Dupont" 
                  className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div 
                  className="h-12 w-12 rounded-full bg-white border border-[#e9ecef] overflow-hidden shadow-md"
                >
                  <img 
                    src="/images/chef-amelie.jpg" 
                    alt="Chef Amélie Dupont"
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      const fallbackDiv = document.createElement('div');
                      fallbackDiv.className = "h-full w-full flex items-center justify-center bg-[#B34431] text-white text-sm font-bold";
                      fallbackDiv.textContent = "AD";
                      target.parentNode?.replaceChild(fallbackDiv, target);
                    }}
                  />
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-4 text-left">
              "Merci de m'avoir fait confiance ! J'ai préparé un message spécial pour vous expliquer comment tirer le meilleur parti de vos nouvelles recettes."
            </p>
            
            {/* Player de áudio integrado */}
            <SimpleAudioPlayer />
          </CardContent>
        </Card>

        {/* Instruções */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            📧 Vérifiez votre email maintenant
          </h3>
          <p className="text-blue-700 mb-2">
            Votre livre "500 Recettes Anti-Inflammatoires" vous a été envoyé par email.
          </p>
          <p className="text-sm text-blue-600">
            💡 Astuce : Vérifiez aussi votre dossier spam/courrier indésirable
          </p>
        </div>

        {/* Bouton d'action condicionnal */}
        {showButton && (
          <div className="w-full">
            <Button 
              className="w-full btn-pulse bg-[#E07260] hover:bg-[#D66650] text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                window.open('https://wa.me/message/EXAMPLE', '_blank');
              }}
            >
              💬 Rejoindre le groupe WhatsApp VIP
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Accès exclusif aux conseils personnalisés d'Amélie
            </p>
          </div>
        )}

        {/* Footer avec informations */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Des questions ? Notre équipe est là pour vous aider.
          </p>
          <p className="text-xs text-gray-400">
            © 2024 Chef Amélie Dupont - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}