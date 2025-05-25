
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";
import { ChefImages } from "@/assets/imageExports";

// Importação direta do arquivo de áudio - isso garante que o Vite otimize corretamente
// Definição do caminho do arquivo de áudio com caminho absoluto para garantir compatibilidade
const AUDIO_SRC = "/audio/message.wav";

// Componente de áudio simplificado
const SimpleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.log("Erro ao reproduzir: reprodução automática bloqueada ou arquivo não disponível");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center w-full mb-5">
      <audio 
        ref={audioRef} 
        src={AUDIO_SRC} 
        preload="auto"
        style={{ display: 'none' }} 
      />
      <button 
        onClick={togglePlay}
        className="bg-[#2476c7] hover:bg-[#1c64a9] text-white rounded-full w-16 h-16 flex items-center justify-center mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <p className="text-sm text-gray-500">
        {isPlaying ? "Lecture en cours..." : "Cliquez pour écouter le message d'Amélie"}
      </p>
    </div>
  );
};

export default function ThankYou() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [progressPosition, setProgressPosition] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressTimerRef = useRef<number | null>(null);
  
  // Timer para mostrar o botão após exatamente 2 minutos (120000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 120000); // 2 minutos exatos
    
    return () => clearTimeout(timer);
  }, []);

  // Efeito para lidar com eventos do elemento de áudio
  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (!audioElement) return;
    
    const handleTimeUpdate = () => {
      if (audioElement.duration > 0) {
        const position = (audioElement.currentTime / audioElement.duration) * 100;
        setProgressPosition(position);
      }
    };
    
    const handleEnded = () => {
      setAudioPlaying(false);
    };
    
    const handleError = (e: Event) => {
      console.error("Erro ao carregar/reproduzir áudio:", e);
      if (audioPlaying) {
        // Ativar simulação visual se o áudio falhar durante a reprodução
        simulateAudioProgress();
      }
    };
    
    // Adicionar event listeners
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('error', handleError);
    
    // Limpeza
    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('error', handleError);
      
      // Parar o áudio e a simulação ao desmontar
      audioElement.pause();
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [audioPlaying]);
  
  // Função para controlar a reprodução do áudio
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (audioPlaying) {
      // Parar o áudio e a simulação
      audioRef.current.pause();
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setAudioPlaying(false);
    } else {
      // Iniciar reprodução
      setAudioPlaying(true);
      
      try {
        // Reiniciar áudio se estiver no final
        if (audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
          audioRef.current.currentTime = 0;
        }
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            simulateAudioProgress();
          });
        }
      } catch (error) {
        console.error("Erro ao manipular áudio:", error);
        simulateAudioProgress();
      }
    }
  };
  
  // Função para avançar ou retroceder no áudio
  const seekAudio = (position: number) => {
    if (!audioRef.current) return;
    
    try {
      const newTime = (position / 100) * (audioRef.current.duration || 180);
      audioRef.current.currentTime = newTime;
      setProgressPosition(position);
    } catch (error) {
      console.error("Erro ao buscar posição no áudio:", error);
    }
  };
  
  // Função auxiliar para simular o progresso do áudio visualmente
  const simulateAudioProgress = () => {
    // Limpar timer existente, se houver
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    console.log("Usando simulação visual de progresso");
    let progress = progressPosition || 0;
    
    // Duração total da simulação: 3 minutos (180 segundos)
    const totalDuration = 180;  
    const updateInterval = 100; // milissegundos
    
    // Calcula o incremento por intervalo para completar em ~3 minutos
    const increment = (100 / (totalDuration * 1000 / updateInterval));
    
    progressTimerRef.current = window.setInterval(() => {
      progress += increment;
      setProgressPosition(progress);
      
      if (progress >= 100) {
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
        }
        setProgressPosition(100);
        setAudioPlaying(false);
      }
    }, updateInterval);
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
        
        {/* Player de áudio - design moderno similar à referência */}
        <Card className="w-full mb-10 overflow-hidden bg-[#f8f9fa] border border-[#e9ecef] shadow-sm">
          <CardContent className="p-6">
            {/* Elemento de áudio com controles ocultos mas disponíveis em caso de depuração */}
            <div className="w-full mb-4" style={{ display: 'none' }}>
              <audio 
                ref={audioRef}
                src={AUDIO_SRC}
                preload="auto"
                controls
                onError={(e) => {
                  console.error("Erro ao carregar áudio:", e);
                  // Usar simulação quando houver erro
                  setTimeout(() => {
                    if (audioPlaying) {
                      simulateAudioProgress();
                    }
                  }, 500);
                }}
              />
            </div>
            
            {/* Barra de progresso personalizada (sempre visível) */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div 
                className="h-full bg-[#2476c7] rounded-full transition-all duration-100"
                style={{ width: `${progressPosition}%` }}
              ></div>
            </div>
            
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
                      // Fallback para as iniciais quando a imagem não carregar
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
            
            <div className="flex items-center">
              {/* Botão de play/pause estilizado */}
              <button 
                onClick={toggleAudio}
                className="h-12 w-12 rounded-full bg-[#2476c7] hover:bg-[#1c64a9] transition-colors flex items-center justify-center text-white mr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-[#2476c7] focus:ring-opacity-50"
                aria-label={audioPlaying ? "Pause" : "Play"}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${audioPlaying ? "hidden" : "block"}`}
                >
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${audioPlaying ? "block" : "hidden"}`}
                >
                  <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
                </svg>
              </button>
              
              {/* Container para visualização de onda e progresso */}
              <div className="flex-1 h-10 relative">
                {/* Visualização de onda de áudio (estático, decorativo) */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-between">
                  {/* Linhas verticais que simulam uma forma de onda de áudio */}
                  {Array.from({ length: 50 }).map((_, index) => {
                    // Altura variada para simular forma de onda de áudio, com padrão mais realista
                    const height = Math.abs(Math.sin((index * 0.3) % Math.PI) * 70 + 
                                    Math.cos((index * 0.2) % Math.PI) * 20) + 5;
                    
                    // Determina se este segmento está na parte "reproduzida" do áudio
                    const isPlayed = index < (progressPosition / 100 * 50);
                    
                    return (
                      <div 
                        key={index}
                        className={`mx-[1px] ${isPlayed ? 'bg-[#2476c7]' : 'bg-[#e9ecef]'}`}
                        style={{ 
                          height: `${height}%`, 
                          width: '2px',
                          opacity: isPlayed ? 0.7 : 0.5,
                          transition: 'background-color 0.3s, opacity 0.3s'
                        }}
                      ></div>
                    );
                  })}
                </div>
                
                {/* Área clicável para controle de progresso */}
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={(e) => {
                    const container = e.currentTarget;
                    const rect = container.getBoundingClientRect();
                    const clickPosition = (e.clientX - rect.left) / rect.width;
                    
                    // Calcular a nova posição como porcentagem
                    const newPositionPercent = clickPosition * 100;
                    
                    // Atualizar o áudio e a visualização
                    seekAudio(newPositionPercent);
                  }}
                ></div>
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
