
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";
import { ChefImages, ThankYouImages } from "@/assets/imageExports";

export default function ThankYou() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progressPosition, setProgressPosition] = useState(0);
  
  // Timer para mostrar o botão após 2 minutos (120000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 120000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Função para controlar a reprodução do áudio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };
  
  // Função para atualizar a barra de progresso
  const updateProgress = () => {
    if (audioRef.current) {
      const position = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgressPosition(position);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Título principal com ícone de presente */}
        <h1 className="text-4xl font-bold text-[#B34431] text-center mb-8">
          <span className="inline-block mr-2">🎁</span> Merci infiniment pour votre confiance!
        </h1>
        
        {/* Texto introdutório */}
        <p className="text-lg text-center mb-8 max-w-lg">
          Avant d'aller découvrir vos recettes dans votre boîte mail…
          <br />j'ai préparé un message très spécial rien que pour vous.
        </p>
        
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
        
        {/* Player de áudio */}
        <Card className="w-full mb-10 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-[#B34431]">Chef Amélie Dupont</p>
              <img 
                src={ChefImages.profile} 
                alt="Chef Amélie Dupont" 
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            
            <div className="flex items-center mt-4">
              {/* Botão de play/pause */}
              <button 
                onClick={toggleAudio}
                className="h-10 w-10 rounded-full bg-[#2E7BC2] flex items-center justify-center text-white mr-3"
              >
                {audioPlaying ? "⏸️" : "▶️"}
              </button>
              
              {/* Barra de progresso */}
              <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIzMHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9IndhdmUiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyMCI+CiAgICAgIDxwYXRoIGQ9Ik0wLDEwIEwxMCwxMCBMNSwyMCBMMCwxMCBaIiBmaWxsPSJyZ2JhKDIwMCwyMDAsMjAwLDAuNSkiIC8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjd2F2ZSkiIC8+Cjwvc3ZnPg==')"
                  }}
                >
                  <div 
                    className="h-full bg-[#2E7BC2] rounded-full"
                    style={{ width: `${progressPosition}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Áudio oculto */}
        <audio 
          ref={audioRef} 
          src="/audio/message.wav" 
          onTimeUpdate={updateProgress}
          onEnded={() => setAudioPlaying(false)}
        />
        
        {/* Botão de ação (visível após 2 minutos) */}
        {showButton && (
          <div className="w-full flex flex-col items-center mt-4">
            <Button 
              className="bg-[#57C084] hover:bg-[#45A871] text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg mb-4 transition-all transform hover:scale-105"
            >
              JE VEUX UN PLAN CHAQUE DIMANCHE !
            </Button>
            <a href="#" className="text-[#B34431] text-sm hover:underline">
              Non, merci !
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
