import { FacebookPixel } from '@/lib/fbPixel';
import { useEffect } from 'react';

export default function ThankYou() {
  useEffect(() => {
    FacebookPixel.trackThankYouPage();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        
        {/* Título principal */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#B34431] leading-tight">
            🎁 Merci infiniment pour votre confiance!
          </h1>
        </div>

        {/* Texto explicativo */}
        <div className="space-y-4 text-gray-700 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
          <p>
            Avant d'aller découvrir vos recettes dans votre boîte mail...
          </p>
          <p>
            j'ai préparé un message très spécial rien que pour vous.
          </p>
        </div>

        {/* Instrução do áudio */}
        <div className="space-y-4 py-6">
          <div className="flex items-center justify-center space-x-3 text-gray-700 text-lg">
            <span className="text-blue-500 text-xl">▶️</span>
            <span className="font-medium">Appuie sur lecture pour écouter l'audio</span>
            <span className="text-xl">👆</span>
          </div>
          <p className="text-gray-600 text-base">
            Je vous explique tout, en moins de 3 minutes.
          </p>
        </div>
        
        {/* Player de áudio estilo WhatsApp */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#B34431] font-medium text-lg">Chef Amélie Dupont</h3>
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Chef Amélie Dupont"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              id="audio-play-button"
              className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              onClick={() => {
                const audio = document.getElementById('hidden-audio') as HTMLAudioElement;
                const button = document.getElementById('audio-play-button');
                if (audio.paused) {
                  audio.play();
                  button!.innerHTML = `
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  `;
                } else {
                  audio.pause();
                  button!.innerHTML = `
                    <svg class="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                  `;
                }
              }}
            >
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex-1 h-10 bg-gray-200 rounded-full flex items-center px-4">
              <div className="flex space-x-1">
                {[...Array(25)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-gray-500 rounded-full"
                    style={{ height: `${Math.random() * 20 + 10}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <audio 
            id="hidden-audio"
            preload="metadata"
            onEnded={() => {
              const button = document.getElementById('audio-play-button');
              button!.innerHTML = `
                <svg class="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
              `;
            }}
          >
            <source src="/audio/Segundos.mp4" type="audio/mp4" />
            <source src="/audio/Segundos.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}