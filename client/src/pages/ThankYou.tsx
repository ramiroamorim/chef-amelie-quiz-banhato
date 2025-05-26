
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
            <source src="/audio/segundos.mp3" type="audio/mpeg" />
            <source src="/audio/message.mp3" type="audio/mpeg" />
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
    
    if (!audio) {
      console.error("Elemento de áudio não encontrado");
      return;
    }
    
    try {
      if (audioPlaying) {
        // Pausar áudio
        audio.pause();
        setAudioPlaying(false);
        if (progressTimerRef.current) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
        }
      } else {
        // Reproduzir áudio
        console.log("Tentando reproduzir áudio...");
        
        // Definir volume máximo
        audio.volume = 1.0;
        
        // Se o áudio terminou, reiniciar do início
        if (audio.ended) {
          audio.currentTime = 0;
        }
        
        // Tentar reproduzir
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log("Áudio reproduzindo com sucesso!");
          setAudioPlaying(true);
        }
      }
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
      // Se falhar, usar simulação visual apenas
      if (!audioPlaying) {
        setAudioPlaying(true);
        simulateAudioProgress();
      }
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
            
            {/* Player de áudio que REALMENTE funciona */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-center mb-2">
                <p className="text-sm font-medium text-[#B34431] mb-1">🎧 Mensagem da Chef Amélie</p>
                <p className="text-xs text-gray-500">Arquivos corrigidos - Clique play para ouvir</p>
              </div>
              
              <audio 
                controls
                controlsList="nodownload"
                className="w-full"
                preload="auto"
                style={{ 
                  height: '50px',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <source src="/audio/message.mp3" type="audio/mpeg" />
                <source src="/audio/Segundos.mp3" type="audio/mpeg" />
                <source src="/audio/segundos.mp3" type="audio/mpeg" />
                <p>Seu navegador não suporta reprodução de áudio. <a href="/audio/message.mp3" download>Baixe o arquivo aqui</a>.</p>
              </audio>
              
              <div className="text-center mt-2">
                <p className="text-xs text-gray-400">
                  💡 Se não reproduzir, tente o link de download acima
                </p>
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
