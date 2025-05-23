import React from 'react';

// URLs para imagens de alimentos que correspondem às do exemplo
const dish1 = 'https://images.unsplash.com/photo-1631898039984-fd5f61fe8732?w=400&h=300&fit=crop';  // Gâteau au citron
const dish2 = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop';  // Pizza
const dish3 = 'https://images.unsplash.com/photo-1541783245831-57d6f0a639a7?w=400&h=300&fit=crop';  // Mousse au chocolat
const dish4 = 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=400&h=300&fit=crop';  // Pancakes
const dish5 = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop';  // Tarte aux légumes
const dish6 = 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop';  // Brownie
const dish7 = 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop';  // Gâteau aux fraises
const dish8 = 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&h=300&fit=crop';  // Tarte aux fruits

// Definindo os dados das receitas com base nas imagens do site original
const recipeImages = [
  { 
    src: dish1, 
    alt: "Gâteau au citron sans gluten",
    caption: "Dessert moelleux au citron sans gluten"
  },
  { 
    src: dish2, 
    alt: "Pizza végétarienne sans gluten et lactose", 
    caption: "Pizza fondante sans lactose"
  },
  { 
    src: dish3, 
    alt: "Mousse au chocolat sans sucre", 
    caption: "Mousse au chocolat onctueuse sans sucre"
  },
  { 
    src: dish4, 
    alt: "Pancakes aux fruits sans gluten", 
    caption: "Pancakes aux fruits rouges sans gluten"
  },
  { 
    src: dish5, 
    alt: "Tarte aux légumes sans gluten", 
    caption: "Quiche fondante aux légumes"
  },
  { 
    src: dish6, 
    alt: "Brownie sans sucre ni lactose", 
    caption: "Brownie fondant sans sucre raffiné"
  },
  { 
    src: dish7, 
    alt: "Salade gourmande aux fraises", 
    caption: "Crêpe fraises chocolat sans sucre"
  },
  { 
    src: dish8, 
    alt: "Tarte aux fruits sans gluten ni lactose", 
    caption: "Tarte aux fruits rouges"
  }
];

/**
 * Componente que exibe uma grade de imagens de receitas
 * Utilizado na página de vendas para mostrar exemplos de receitas do livro
 */
export const RecipeImageGrid: React.FC = () => {
  // Mostra apenas as primeiras 8 receitas em uma grade 2x4
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-4">
        {recipeImages.slice(0, 4).map((recipe, index) => (
          <div key={index} className="recipe-item">
            <div className="rounded-md overflow-hidden border border-gray-200">
              <img 
                src={recipe.src} 
                alt={recipe.alt} 
                className="w-full h-[180px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-4">
        {recipeImages.slice(4, 8).map((recipe, index) => (
          <div key={index + 4} className="recipe-item">
            <div className="rounded-md overflow-hidden border border-gray-200">
              <img 
                src={recipe.src} 
                alt={recipe.alt} 
                className="w-full h-[180px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Versão alternativa que exibe apenas 4 imagens em uma grade 2x2
 * Útil para seções com menos espaço
 */
export const RecipeImageGridCompact: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {recipeImages.slice(0, 4).map((recipe, index) => (
        <div key={index} className="recipe-item">
          <div className="rounded-md overflow-hidden border border-gray-200">
            <img 
              src={recipe.src} 
              alt={recipe.alt} 
              className="w-full h-[180px] object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};