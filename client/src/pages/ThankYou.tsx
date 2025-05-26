
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";
import { ChefImages } from "@/assets/imageExports";

// Player de áudio definitivo que funciona
const SimpleAudioPlayer = () => {
  return (
    <div className="flex flex-col items-center w-full mb-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎧 Mensagem da Chef Amélie</h3>
          <p className="text-sm text-gray-600">Ouça a mensagem especial sobre suas receitas</p>
        </div>
        

      </div>
    </div>
  );
};

export default function ThankYou() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [progressPosition, setProgressPosition] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressTimerRef = useRef<number | null>(null);
  
  // Timer para mostrar o botão após exatamente 2 minutos (120000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 120000); // 2 minutos exatos
    
    return () => clearTimeout(timer);
  }, []);
  
  // Pré-carregar o áudio para melhor experiência do usuário
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load(); // Força o carregamento do áudio
    }
  }, []);
  
  // Configurar eventos do áudio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setAudioLoaded(true);
      setAudioDuration(audio.duration);
      console.log("Áudio pronto para reprodução, duração:", audio.duration);
    };

    const handleLoadedData = () => {
      setAudioLoaded(true);
      setAudioDuration(audio.duration);
      console.log("Dados do áudio carregados com sucesso");
    };

    const handleError = (e: Event) => {
      console.error("Erro ao carregar áudio:", e);
      setAudioLoaded(false);
    };

    // Verificar se o áudio já está carregado
    if (audio.readyState >= 3) { // HAVE_FUTURE_DATA ou HAVE_ENOUGH_DATA
      setAudioLoaded(true);
      setAudioDuration(audio.duration);
    }

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("error", handleError);
    };
  }, []);
  
  // Função para controlar a reprodução do áudio
  const toggleAudio = async () => {
    const audio = audioRef.current;
    
    if (!audio) {
      console.error("Elemento de áudio não encontrado");
      return;
    }
    
    try {
      if (audioPlaying) {
        // Pausar áudio
        audio.pause();
      } else {
        // Garantir que o áudio está pronto para reprodução
        if (audio.readyState < 2) {
          console.log("Carregando áudio...");
          audio.load();
          
          // Aguardar o carregamento
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Timeout no carregamento do áudio"));
            }, 5000);
            
            const onLoadedData = () => {
              clearTimeout(timeout);
              audio.removeEventListener('loadeddata', onLoadedData);
              audio.removeEventListener('error', onError);
              resolve(true);
            };
            
            const onError = (e: Event) => {
              clearTimeout(timeout);
              audio.removeEventListener('loadeddata', onLoadedData);
              audio.removeEventListener('error', onError);
              reject(e);
            };
            
            audio.addEventListener('loadeddata', onLoadedData);
            audio.addEventListener('error', onError);
          });
        }
        
        // Configurar e reproduzir áudio
        audio.volume = 1.0;
        
        if (audio.ended) {
          audio.currentTime = 0;
        }
        
        // Tentar reproduzir com interação do usuário
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log("Áudio reproduzindo com sucesso!");
        }
      }
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
      // Tentar recarregar se houver erro
      audio.load();
    }
  };
  
  // Função para navegar no áudio
  const seekAudio = (position: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    // Navegar para a posição no áudio real
    const newTime = (position / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgressPosition(position);
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
            {/* Elemento de áudio oculto para controles customizados */}
            {/* Elemento de áudio com múltiplas fontes */}
            <audio 
              ref={audioRef}
              preload="auto"
              style={{ display: 'none' }}
              onPlay={() => setAudioPlaying(true)}
              onPause={() => setAudioPlaying(false)}
              onEnded={() => {
                setAudioPlaying(false);
                setProgressPosition(0);
              }}
              onTimeUpdate={() => {
                const audio = audioRef.current;
                if (audio && audio.duration > 0) {
                  const progress = (audio.currentTime / audio.duration) * 100;
                  setProgressPosition(progress);
                }
              }}
              onLoadStart={() => console.log("Iniciando carregamento do áudio")}
              onCanPlay={() => console.log("Áudio pode ser reproduzido")}
              onError={(e) => console.error("Erro específico do áudio:", e)}
            >
              <source src="/audio/Segundos.mp4" type="audio/mp4" />
              <source src="/audio/Segundos.mp3" type="audio/mpeg" />
              <source src="/audio/message.mp3" type="audio/mpeg" />
              Seu navegador não suporta reprodução de áudio.
            </audio>
            
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
            
            <div className="flex items-center">
              {/* Botão de play/pause estilizado */}
              <button 
                onClick={toggleAudio}
                disabled={!audioLoaded}
                className={`h-12 w-12 rounded-full ${
                  audioLoaded 
                    ? 'bg-[#2476c7] hover:bg-[#1c64a9] cursor-pointer' 
                    : 'bg-gray-400 cursor-not-allowed'
                } transition-colors flex items-center justify-center text-white mr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-[#2476c7] focus:ring-opacity-50`}
                aria-label={audioPlaying ? "Pause" : "Play"}
              >
                {!audioLoaded ? (
                  // Spinner de carregamento
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : audioPlaying ? (
                  // Ícone de pause
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
                  </svg>
                ) : (
                  // Ícone de play
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                  </svg>
                )}
              </button>
              
              {/* Container para visualização de onda e progresso */}
              <div className="flex-1 h-10 relative">
                {audioLoaded ? (
                  <>
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
                        if (!audioLoaded) return;
                        const container = e.currentTarget;
                        const rect = container.getBoundingClientRect();
                        const clickPosition = (e.clientX - rect.left) / rect.width;
                        
                        // Calcular a nova posição como porcentagem
                        const newPositionPercent = clickPosition * 100;
                        
                        // Atualizar o áudio e a visualização
                        seekAudio(newPositionPercent);
                      }}
                    ></div>
                  </>
                ) : (
                  /* Indicador de carregamento */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-gray-500">Carregando áudio...</span>
                  </div>
                )}
              </div>
              
              {/* Informações de duração */}
              {audioLoaded && audioDuration > 0 && (
                <div className="ml-4 text-sm text-gray-600 min-w-[60px] text-right">
                  <span>{Math.floor(progressPosition * audioDuration / 100 / 60)}:{String(Math.floor((progressPosition * audioDuration / 100) % 60)).padStart(2, '0')}</span>
                  <span className="text-gray-400"> / </span>
                  <span>{Math.floor(audioDuration / 60)}:{String(Math.floor(audioDuration % 60)).padStart(2, '0')}</span>
                </div>
              )}
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
