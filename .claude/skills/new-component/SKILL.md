---
name: new-component
description: Creates a new React component following project conventions (shadcn/ui, cn(), TypeScript, Tailwind)
---

Crée un nouveau composant React à `src/components/$ARGUMENTS.tsx` en suivant ces conventions du projet :

**Structure obligatoire**
- Interface TypeScript pour les props (jamais `any`)
- Utilise `cn()` depuis `@/lib/utils` pour les classes conditionnelles
- Export named ET export default
- Un seul composant par fichier, focalisé sur une responsabilité

**Template de base à suivre :**
```tsx
import { cn } from "@/lib/utils"

interface [Name]Props {
  className?: string
  // autres props...
}

export function [Name]({ className, ...props }: [Name]Props) {
  return (
    <div className={cn("", className)}>
      {/* contenu */}
    </div>
  )
}

export default [Name]
```

**Règles styling**
- Tailwind uniquement, pas de styles inline
- Classes ordonnées : layout → spacing → colors → typography → états (hover, focus)
- Mobile-first avec breakpoints sm: md: lg: si responsive nécessaire
- Utilise les tokens Tailwind du projet (voir tailwind.config.ts)

**Si le composant est interactif**
- Gestion clavier (onKeyDown/onKeyUp si nécessaire)
- Attributs ARIA appropriés
- États visuels : hover, focus, disabled

Après création, propose de lancer le ui-reviewer agent pour valider le composant.
