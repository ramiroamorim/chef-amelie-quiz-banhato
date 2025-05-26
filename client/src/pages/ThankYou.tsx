import { FacebookPixel } from '@/lib/fbPixel';
import { useEffect, useState } from 'react';

export default function ThankYou() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    FacebookPixel.trackThankYouPage();
  }, []);

  const handleAudioToggle = () => {
    const audio = document.getElementById('hidden-audio') as HTMLAudioElement;
    
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        
        {/* Título principal */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#B34431] leading-tight">
            🎁 Merci infiniment pour votre confiance!
          </h1>
        </div>

        {/* Texto explicativo */}
        <div className="text-center space-y-6 text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            Avant d'aller découvrir vos recettes dans votre boîte mail...
          </p>
          <p>
            j'ai préparé un message très spécial rien que pour vous.
          </p>
        </div>

        {/* Instrução do áudio */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 text-gray-800 text-xl font-medium">
            <span className="text-blue-500 text-2xl">▶️</span>
            <span>Appuie sur lecture pour écouter l'audio</span>
            <span className="text-2xl">👆</span>
          </div>
          <p className="text-gray-700 text-lg">
            Je vous explique tout, en moins de 3 minutes.
          </p>
        </div>
        
        {/* Player de áudio */}
        <div className="bg-gray-50 rounded-2xl border border-gray-300 p-6 shadow-sm max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#B34431] font-medium text-lg">Chef Amélie Dupont</h3>
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Chef Amélie Dupont"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Botão triangular azul com controle de estado */}
            <button 
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
              onClick={handleAudioToggle}
            >
              {isPlaying ? (
                // Círculo azul quando tocando
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              ) : (
                // Triângulo de play quando pausado
                <div className="w-0 h-0 border-l-[20px] border-l-blue-500 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></div>
              )}
            </button>
            
            {/* Ondas sonoras mais realistas */}
            <div className="flex-1 flex items-center space-x-1 px-2">
              {[14, 8, 16, 12, 18, 10, 20, 6, 22, 14, 16, 8, 24, 12, 18, 10, 20, 14, 16, 12].map((height, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-blue-400 rounded-full"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
          
          <audio 
            id="hidden-audio"
            preload="metadata"
            onEnded={handleAudioEnded}
          >
            <source src="/audio/Segundos.mp4" type="audio/mp4" />
            <source src="/audio/Segundos.mp3" type="audio/mpeg" />
          </audio>
        </div>

        {/* Botão verde */}
        <div className="text-center space-y-6">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg transition-colors">
            JE VEUX UN PLAN CHAQUE DIMANCHE !
          </button>
          
          <div>
            <a href="#" className="text-[#B34431] text-lg hover:underline">
              Non, merci !
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}