
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";
import { ChefImages } from "@/assets/imageExports";

// Player de áudio funcional
const SimpleAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleCanPlay = () => {
      setIsLoaded(true);
      setError(null);
    };
    
    const handleError = (e: any) => {
      console.error("Erro ao carregar áudio:", e);
      setError("Erro ao carregar o áudio");
      setIsLoaded(false);
    };
    
    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    
    // Force load
    audio.load();
    
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);
  
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;
    
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.volume = 1.0;
        if (audio.ended) {
          audio.currentTime = 0;
        }
        await audio.play();
      }
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
      setError("Erro ao reproduzir o áudio");
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full mb-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <div className="text-center mb-3">
          <h3 className="text-sm font-medium text-gray-800">Mensagem especial da Chef Amélie</h3>
          <p className="text-xs text-gray-500">Clique para reproduzir a mensagem de áudio</p>
        </div>
        
        <audio 
          ref={audioRef}
          preload="auto"
          className="hidden"
        >
          <source src="/audio/segundos.mp3" type="audio/mpeg" />
          <source src="/audio/message.mp3" type="audio/mpeg" />
        </audio>
        
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={!isLoaded || !!error}
            className="flex items-center justify-center w-16 h-16 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-full transition-colors shadow-lg"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="m7 4 10 6L7 16V4z"/>
              </svg>
            )}
          </button>
          
          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}
          
          {!isLoaded && !error && (
            <p className="text-xs text-gray-500 text-center">Carregando áudio...</p>
          )}
        </div>
      </div>
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
  
  // Iniciar simulação do áudio automaticamente para melhorar a experiência do usuário
  useEffect(() => {
    // Iniciar simulação automaticamente após 1 segundo
    const autoplayTimer = setTimeout(() => {
      if (!audioPlaying) {
        setAudioPlaying(true);
        simulateAudioProgress();
      }
    }, 1000);
    
    return () => clearTimeout(autoplayTimer);
  }, []);
  
  // Configurar eventos do áudio real
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      console.log("Audio loaded successfully");
    };

    const handleError = (e: Event) => {
      console.error("Error loading audio:", e);
    };

    const handleTimeUpdate = () => {
      if (audio.duration > 0) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgressPosition(progress);
      }
    };

    const handlePlay = () => {
      setAudioPlaying(true);
      // Iniciar timer para atualizar progresso
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      progressTimerRef.current = window.setInterval(() => {
        if (audio.duration > 0) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setProgressPosition(progress);
        }
      }, 100);
    };

    const handlePause = () => {
      setAudioPlaying(false);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };

    const handleEnded = () => {
      setAudioPlaying(false);
      setProgressPosition(100);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };
  }, []);
  
  // Função para controlar a reprodução do áudio
  const toggleAudio = async () => {
    console.log("Toggle áudio clicado - Estado atual:", audioPlaying);
    
    const audio = audioRef.current;
    
    try {
      if (audioPlaying) {
        // Pausar áudio
        if (audio && !audio.paused) {
          audio.pause();
        }
        setAudioPlaying(false);
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
        }
      } else {
        // Reproduzir áudio
        if (audio) {
          try {
            await audio.play();
            setAudioPlaying(true);
          } catch (e) {
            console.log("Áudio real falhou, usando simulação:", e);
            // Usar simulação se áudio real falhar
            setAudioPlaying(true);
            simulateAudioProgress();
          }
        } else {
          // Usar simulação se não há elemento de áudio
          setAudioPlaying(true);
          simulateAudioProgress();
        }
      }
    } catch (error) {
      console.error("Erro ao controlar áudio:", error);
    }
  };
  
  // Função para navegar no áudio
  const seekAudio = (position: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Se o áudio tem duração, navegar para a posição
    if (audio.duration > 0) {
      const newTime = (position / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgressPosition(position);
    } else {
      // Fallback para simulação se não há áudio real
      setProgressPosition(position);
      
      if (audioPlaying && progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
        
        let progress = position;
        const totalDuration = 120;
        const updateInterval = 200;
        const increment = 100 / (totalDuration * 1000 / updateInterval);
        
        progressTimerRef.current = window.setInterval(() => {
          progress += increment;
          
          if (progress >= 100) {
            if (progressTimerRef.current) {
              clearInterval(progressTimerRef.current);
              progressTimerRef.current = null;
            }
            progress = 100;
            setAudioPlaying(false);
          }
          
          setProgressPosition(progress);
        }, updateInterval);
      }
    }
  };
  
  // Função simplificada para simular o progresso do áudio visualmente
  const simulateAudioProgress = () => {
    // Limpar timer existente antes de criar um novo
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    
    // Reiniciar o progresso ao começar
    setProgressPosition(0);
    let progress = 0;
    
    // Duração total: 2 minutos (120 segundos)
    const totalDuration = 120;  
    const updateInterval = 200; // milissegundos (atualização mais suave)
    
    // Incremento por intervalo para completar na duração definida
    const increment = 100 / (totalDuration * 1000 / updateInterval);
    
    // Iniciar o timer de atualização
    progressTimerRef.current = window.setInterval(() => {
      progress += increment;
      
      if (progress >= 100) {
        // Finalizar quando chegar a 100%
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
        }
        progress = 100;
        setAudioPlaying(false);
      }
      
      setProgressPosition(progress);
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
            {/* Elemento de áudio oculto - configurado para reprodução real */}
            <div style={{ display: 'none' }}>
              <audio 
                ref={audioRef}
                src="/audio/segundos.mp3"
                preload="metadata"
                crossOrigin="anonymous"
              />
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
