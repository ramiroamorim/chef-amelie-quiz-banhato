
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";
import { ChefImages } from "@/assets/imageExports";

export default function ThankYou() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progressPosition, setProgressPosition] = useState(0);
  
  // Timer para mostrar o botão após 2 minutos (120000ms)
  // Reduzido para 10 segundos (10000ms) em desenvolvimento para teste
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000); // Em produção: 120000
    
    return () => clearTimeout(timer);
  }, []);

  // Efeito para criar o elemento de áudio programaticamente
  useEffect(() => {
    // Criar o elemento de áudio
    const audio = new Audio("/audio/message.wav");
    audioRef.current = audio;
    
    // Configurar os manipuladores de eventos
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });
    
    audio.addEventListener('error', (e) => {
      console.error("Erro ao carregar áudio:", e);
      setAudioError(true);
    });
    
    audio.addEventListener('timeupdate', () => {
      if (audio.duration > 0) {
        const position = (audio.currentTime / audio.duration) * 100;
        setProgressPosition(position);
      }
    });
    
    audio.addEventListener('ended', () => {
      setAudioPlaying(false);
    });
    
    // Limpeza
    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', () => {});
      audio.removeEventListener('error', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, []);
  
  // Função para controlar a reprodução do áudio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        // Parar o áudio se estiver tocando
        audioRef.current.pause();
        setAudioPlaying(false);
      } else {
        // Demonstração: simulamos que o áudio está funcionando para visualização
        setAudioPlaying(true);
        
        // Tentativa real de reproduzir o áudio (pode falhar no ambiente)
        try {
          audioRef.current.play().catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            // Continua com a simulação visual mesmo se o áudio real falhar
          });
        } catch (e) {
          console.warn("Usando simulação visual apenas.");
        }
        
        // Simulação de progresso para demonstração visual
        // Em caso de falha na reprodução real do áudio
        let progressTimer: number | null = null;
        
        if (!audioLoaded || audioError) {
          let progress = 0;
          progressTimer = window.setInterval(() => {
            progress += 1;
            setProgressPosition(progress);
            if (progress >= 100) {
              clearInterval(progressTimer!);
              setAudioPlaying(false);
            }
          }, 300); // Simula um áudio de 30 segundos
        }
        
        return () => {
          if (progressTimer !== null) {
            clearInterval(progressTimer);
          }
        };
      }
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
        
        {/* Player de áudio - design moderno similar à referência */}
        <Card className="w-full mb-10 overflow-hidden bg-[#f8f9fa] border border-[#e9ecef] shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-[#B34431] text-lg">Chef Amélie Dupont</p>
              {ChefImages && ChefImages.profile ? (
                <img 
                  src={ChefImages.profile} 
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
                    try {
                      if (audioRef.current && !isNaN(audioRef.current.duration)) {
                        const container = e.currentTarget;
                        const rect = container.getBoundingClientRect();
                        const clickPosition = (e.clientX - rect.left) / rect.width;
                        const newTime = clickPosition * audioRef.current.duration;
                        
                        // Garantir que o tempo esteja dentro dos limites válidos
                        if (newTime >= 0 && newTime <= audioRef.current.duration) {
                          audioRef.current.currentTime = newTime;
                          setProgressPosition(clickPosition * 100);
                        }
                      }
                    } catch (error) {
                      console.error("Erro ao ajustar tempo do áudio:", error);
                    }
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 
          Observação: O elemento de áudio é criado programaticamente via useEffect 
          para melhor controle e tratamento de erros
        */}
        
        {/* Botão de ação (visível após tempo definido) */}
        {showButton && (
          <div className="w-full flex flex-col items-center mt-4">
            <Button 
              className="bg-[#57C084] hover:bg-[#45A871] text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg mb-4 transition-all transform hover:scale-105"
              onClick={() => window.location.href = "https://pay.hotmart.com/V99272097O?off=kz99x2py&checkoutMode=10&bid=1748014910797"}
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
