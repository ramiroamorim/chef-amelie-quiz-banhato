import React from 'react';

const RecipeCard = ({ title }: { title?: string }) => (
  <div className="bg-[#FDF8F5] rounded-md overflow-hidden shadow-sm relative">
    <div className="absolute top-0 left-0 z-10 m-1 px-1.5 py-1 text-[10px] font-medium bg-white bg-opacity-90 rounded text-green-700 shadow-sm">
      ✓ SANS SUCRE<br/>
      ✓ SANS GLUTEN<br/>
      ✓ SANS LACTOSE
    </div>
    <div className="h-[120px] bg-gradient-to-br from-amber-50 to-orange-50 rounded"></div>
    {title && <div className="p-2 text-xs text-center font-medium">{title}</div>}
  </div>
);

export const RecipeGrid = () => {
  return (
    <div className="w-full p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-2 gap-3">
        <RecipeCard title="Brownie fondant" />
        <RecipeCard title="Pizza sans gluten" />
        <RecipeCard title="Mousse chocolat" />
        <RecipeCard title="Pancakes" />
      </div>
    </div>
  );
};

export default RecipeGrid;
