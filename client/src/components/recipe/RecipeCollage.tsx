import React from 'react';
import { RecipeImages } from '@/assets/imageExports';

interface RecipeCollageProps {
  variant?: 'grid' | 'book';
}

/**
 * Componente para exibir a colagem de imagens de receitas
 * Apresenta diferentes receitas ou o livro de receitas com base na variante escolhida
 */
export const RecipeCollage: React.FC<RecipeCollageProps> = ({ variant = 'grid' }) => {
  const image = variant === 'grid' ? RecipeImages.gridCollage : RecipeImages.book;
  const altText = variant === 'grid' 
    ? "Collection de recettes sans sucre, sans gluten et sans lactose" 
    : "Livre de recettes Chef Amélie Dupont";

  return (
    <div className="w-full p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <img 
        src={image} 
        alt={altText}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};