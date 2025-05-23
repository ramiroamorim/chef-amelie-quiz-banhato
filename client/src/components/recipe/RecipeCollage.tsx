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
  let image;
  let altText;
  
  switch(variant) {
    case 'grid':
      image = RecipeImages.recipes;
      altText = "Collection de recettes sans sucre, sans gluten et sans lactose";
      break;
    case 'book':
      image = RecipeImages.book;
      altText = "Livre de recettes Chef Amélie Dupont";
      break;
    case 'collage':
      image = RecipeImages.collage;
      altText = "Collection de recettes Chef Amélie Dupont";
      break;
    case 'testimonial':
      image = TestimonialImages.testimonial2;
      altText = "Témoignage client";
      break;
    default:
      image = RecipeImages.recipes;
      altText = "Collection de recettes sans sucre, sans gluten et sans lactose";
  }

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