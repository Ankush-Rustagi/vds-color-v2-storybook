# VDS Color v2 Storybook

Migration guides, before/after component stories, team examples, and token reference for the Verkada Design System Color v2 rollout.

**Live (after publish):** https://ankush-rustagi.github.io/vds-color-v2-storybook/

**Strategy hub (separate):** https://ankush-rustagi.github.io/vds-color-v2/

## What's inside

| Section | Contents |
|---------|----------|
| **Foundations/Color v2** | Overview, what's changing, accessibility, rollout phases, greenfield adoption |
| **Migrations/Color v2** | Getting started, Figma workflow, token mapping, Alert Button + Checkbox before/after |
| **Teams** | Per-product-line migration examples (Video Security, AC, Alarms, Maps, Analytics, etc.) |
| **Reference** | Token naming, semantic token samples, color primitives |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:6006

Use the **Theme** toolbar to toggle light/dark mode preview.

## Build

```bash
npm run build
```

Output: `storybook-static/`

## Publish to GitHub Pages

1. Create a new GitHub repo (e.g. `vds-color-v2-storybook`)
2. Push this directory to `main`
3. Enable **Settings → Pages → Source: GitHub Actions**
4. The deploy workflow runs on every push to `main`
5. Site serves at `https://<username>.github.io/vds-color-v2-storybook/`

### Add to portfolio hub

In `Ankush-Rustagi.github.io/src/data/prototypes.ts`:

```ts
{
  slug: 'vds-color-v2-storybook',
  title: 'VDS Color Migration Guide',
  description: 'Storybook catalog for VDS Color v2: migration guides, before/after stories, team examples, and token reference.',
  href: 'https://ankush-rustagi.github.io/vds-color-v2-storybook/?path=/docs/foundations-color-v2-overview--docs',
  category: 'storybook',
  status: 'live',
  createdDate: '2026-05-22',
  modifiedDate: '2026-05-22',
  createdBy: 'Ankush Rustagi',
  lastModifiedBy: 'Ankush Rustagi',
  gradient: 'hex',
  tags: ['design-system', 'tokens', 'vds', 'storybook', 'migration'],
  external: true,
}
```

## Source

- VDS Figma: [VDS - Verkada Design System](https://www.figma.com/design/ErBiDvqI7wPQKKXWfhC6yl/VDS---Verkada-Design-System)
- Color Updates slides 1–10 + Collection token export
