import React from 'react';

// Componente de cartão de receita mais rico visualmente
const RecipeCard = ({ 
  title, 
  bgColor = "#F9EFEA",
  gradient = "bg-gradient-to-br from-amber-50 to-orange-50"
}: { 
  title?: string,
  bgColor?: string,
  gradient?: string
}) => (
  <div className="bg-[#FDF8F5] rounded-md overflow-hidden shadow-sm relative">
    <div className="absolute top-0 left-0 z-10 m-1 px-1.5 py-1 text-[10px] font-medium bg-white bg-opacity-90 rounded text-green-700 shadow-sm">
      ✓ SANS SUCRE<br/>
      ✓ SANS GLUTEN<br/>
      ✓ SANS LACTOSE
    </div>
    <div 
      className={`h-[120px] ${gradient} rounded flex items-center justify-center`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Visualização estilizada de comida */}
      <div className="w-3/4 h-3/4 relative flex items-center justify-center">
        {title === "Brownie fondant" && (
          <div className="w-16 h-16 bg-[#5D4037] rounded-sm shadow-inner transform rotate-3"></div>
        )}
        {title === "Pizza sans gluten" && (
          <div className="w-20 h-20 rounded-full bg-[#F9A825] border-4 border-[#D84315] shadow-inner flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#E53935] border border-[#D84315]"></div>
          </div>
        )}
        {title === "Mousse chocolat" && (
          <div className="w-16 h-16 bg-[#5D4037] rounded-full shadow-inner transform -rotate-12">
            <div className="w-full h-1/3 bg-[#8D6E63] rounded-t-full"></div>
          </div>
        )}
        {title === "Pancakes" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-3 bg-[#FFB74D] rounded-full mb-1 transform -rotate-6"></div>
            <div className="w-20 h-3 bg-[#FFB74D] rounded-full mb-1"></div>
            <div className="w-20 h-3 bg-[#FFB74D] rounded-full transform rotate-6"></div>
          </div>
        )}
      </div>
    </div>
    {title && <div className="p-2 text-xs text-center font-medium">{title}</div>}
  </div>
);

export const RecipeGrid = () => {
  return (
    <div className="w-full p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-2 gap-3">
        <RecipeCard 
          title="Brownie fondant" 
          bgColor="#F5E9E2" 
          gradient="bg-gradient-to-br from-amber-50 to-red-50" 
        />
        <RecipeCard 
          title="Pizza sans gluten" 
          bgColor="#FCF5E5" 
          gradient="bg-gradient-to-br from-yellow-50 to-orange-50"
        />
        <RecipeCard 
          title="Mousse chocolat" 
          bgColor="#F5E9E2" 
          gradient="bg-gradient-to-br from-amber-50 to-red-50"
        />
        <RecipeCard 
          title="Pancakes" 
          bgColor="#FCF5E5" 
          gradient="bg-gradient-to-br from-yellow-50 to-amber-50"
        />
      </div>
    </div>
  );
};

export default RecipeGrid;
