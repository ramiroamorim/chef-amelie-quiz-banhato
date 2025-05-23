# Organisation des Assets

Cette structure contient tous les assets utilisés dans l'application Chef Amélie Dupont, organisés par catégorie.

## Structure des Dossiers

- `/images` - Images organisées par catégorie
  - `/chef` - Photos et images de Chef Amélie
  - `/recipes` - Images des recettes et plats
  - `/testimonials` - Photos pour les témoignages
  - `/book` - Images du livre de recettes

## Bonnes Pratiques

1. **Organisation** - Toujours placer les nouvelles images dans le dossier approprié
2. **Nommage** - Utiliser des noms descriptifs en minuscules avec des tirets
3. **Optimisation** - Optimiser les images pour le web avant de les ajouter
4. **Import** - Utiliser l'alias `@/assets` pour les imports

## Exemple d'Utilisation

```tsx
// Import d'une image
import chefImage from '@/assets/images/chef/chef-amelie.png';

function ChefProfile() {
  return (
    <div>
      <img src={chefImage} alt="Chef Amélie Dupont" />
    </div>
  );
}
```