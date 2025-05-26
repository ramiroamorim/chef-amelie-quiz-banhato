import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";
import { ChefImages } from "@/assets/imageExports";

// Player de áudio que sempre funciona
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Força o carregamento e habilita o botão imediatamente
    setTimeout(() => {
      setDuration(180); // 3 minutos estimado
    }, 1000);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        // Força a reprodução
        audio.volume = 1.0;
        await audio.play();
      }
    } catch (error) {
      console.error('Erro ao reproduzir:', error);
      // Mesmo se der erro, muda o estado visual
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/Segundos.mp3" type="audio/mpeg" />
      </audio>
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#2476c7] hover:bg-[#1c64a9] text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="m7 4 10 6L7 16V4z"/>
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-[#2476c7] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-sm font-medium text-[#B34431]">🎧 Mensagem da Chef Amélie</p>
        <p className="text-xs text-green-600">Clique no botão para reproduzir</p>
      </div>
    </div>
  );
};

// Player de áudio simples e funcional para header
const SimpleAudioPlayer = () => {
  return (
    <div className="flex flex-col items-center w-full mb-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎧 Mensagem da Chef Amélie</h3>
          <p className="text-sm text-gray-600">Ouça a mensagem especial sobre suas receitas</p>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg p-4">
          <audio 
            controls
            className="w-full h-12"
            preload="auto"
            style={{
              borderRadius: '8px',
              outline: 'none'
            }}
          >
            <source src="/audio/Segundos.mp3" type="audio/mpeg" />
            Seu navegador não suporta reprodução de áudio.
          </audio>
          
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              🔊 Use os controles acima para reproduzir o áudio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThankYou() {
  const [showButton, setShowButton] = useState(false);
  
  // Timer para mostrar o botão após exatamente 2 minutos (120000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 120000); // 2 minutos exatos
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#B34431] mb-4">
            Merci pour votre commande ! 
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Votre accès aux 500 recettes de la Chef Amélie Dupont est maintenant activé.
          </p>
        </div>

        {/* Simple Audio Player */}
        <SimpleAudioPlayer />

        {/* Botão de reprodução de áudio */}
        <div className="text-center mb-4">
          <p className="mb-2">
            <span className="bg-[#E9F6FF] text-[#2E7BC2] px-3 py-1 rounded-md">
              ▶️ Appuie sur lecture pour écouter l'audio 👇🏻
            </span>
          </p>
          <p className="text-sm text-gray-600 mb-8">
            Je vous explique tout, en moins de 3 minutes.
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
                      target.parentElement?.appendChild(fallbackDiv);
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Player de áudio elegante */}
            <div className="relative bg-gradient-to-br from-[#B34431] to-[#8B1F1F] rounded-xl p-6 text-white shadow-lg">
              <div className="absolute inset-0 bg-black/10 rounded-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">🎧 Mensagem Especial</h3>
                    <p className="text-white/80 text-sm">Chef Amélie Dupont</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.768l-4.146-3.146a1 1 0 00-.664-.252H2a1 1 0 01-1-1V8a1 1 0 011-1h1.573a1 1 0 00.664-.252l4.146-3.146a1 1 0 011.617.768zM14.657 2.343a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.414A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.829 1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <audio 
                  controls 
                  className="w-full h-12 rounded-lg bg-white/20 backdrop-blur-sm"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)',
                  }}
                  preload="metadata"
                >
                  <source src="/audio/Segundos.mp4" type="audio/mp4" />
                  <source src="/audio/Segundos.mp3" type="audio/mpeg" />
                  <p>Seu navegador não suporta reprodução de áudio.</p>
                </audio>
                
                <div className="mt-3 text-center">
                  <p className="text-white/70 text-xs">
                    ✨ Uma mensagem pessoal da Chef para você
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Botão de ação (visível após tempo definido) */}
        {showButton && (
          <div className="w-full flex flex-col items-center mt-4">
            <Button 
              onClick={() => window.location.href = "https://pay.hotmart.com/V99272097O?off=kz99x2py&checkoutMode=10&bid=1748014910797"}
              style={{
                backgroundColor: "#57C084",
                color: "white",
                fontWeight: "bold",
                padding: "1rem 2rem",
                borderRadius: "9999px",
                fontSize: "1.125rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "1rem",
                transition: "all 0.3s ease",
                transform: "scale(1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#45A26C";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#57C084";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              JE VEUX UN PLAN CHAQUE DIMANCHE !
            </Button>
            <a 
              href="/" 
              className="text-[#B34431] text-sm hover:underline"
            >
              Non, merci !
            </a>
          </div>
        )}
      </div>
    </div>
  );
}