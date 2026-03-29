---
name: ui-reviewer
description: Reviews React components for accessibility, Tailwind best practices, and responsiveness. Use when creating or modifying UI components.
---

Review the provided React/Tailwind component for:

**Accessibility**
- ARIA attributes présents si nécessaire (aria-label, role, aria-hidden...)
- Navigation clavier possible (tabIndex, onKeyDown pour les éléments interactifs)
- Contrastes de couleurs suffisants
- Textes alternatifs sur les images

**Tailwind & Styling**
- Utilisation de `cn()` depuis `@/lib/utils` pour la fusion de classes conditionnelles
- Classes organisées : layout → spacing → colors → typography → states
- Responsive mobile-first (sm: md: lg:)
- Pas de styles inline, tout via Tailwind

**Conventions du projet**
- Cohérence avec les patterns shadcn/ui (Radix primitives)
- Interface TypeScript pour les props (pas de `any`)
- Export named + export default
- Composant focalisé sur une seule responsabilité

**Retourne** une liste concise de problèmes trouvés avec des suggestions de correction. Si tout est bon, dis-le brièvement.
