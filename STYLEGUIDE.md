# 📐 Global UI Style Guide

A neutral, reusable, and component-driven style guide for consistent UI across the project. Use these conventions for all new components and when refactoring existing ones.

---

## 1. 🔤 Typography
- **Headings:**
  - Page-level: `text-2xl font-bold`
  - Section titles: `text-lg font-semibold`
  - Subsection/card headers: `text-sm font-medium`
- **Body text:**
  - Standard: `text-sm`
  - Secondary info: `text-xs` (e.g. timestamps, descriptions)
- **Highlighted/Semantic text:**
  - Use `font-medium` for emphasis

## 2. 📦 Cards & Containers
- Base unit: `Card` component with `rounded-lg` corners
- Section headers inside cards: `CardHeader` with vertical spacing (`pb-2` or `space-y-0`)
- Use padding (`p-4`, `p-6`) inside content blocks for spacing
- Consistent border-radius: `rounded-lg` across all visual boxes
- Avoid box shadows unless required—prefer clarity

## 3. 🧱 Layout
- Global content padding: `p-6` or page wrapper with spacing (`space-y-6`)
- Grids:
  - Responsive multi-column: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (or 5 for metrics)
  - Gaps between items: `gap-4` to `gap-6`
- Use `flex` + `items-center` + `space-x-*` for inline content like avatars + text
- For multi-line sections: use `space-y-*` utilities to manage vertical gaps

## 4. 🟦 Avatar & Icons
- Avatar sizes: `h-8 w-8` (small), `h-10 w-10` (medium)
- Avatar initials fallback: generate from user name
- Icons: use consistent sizing (`h-4 w-4` or `h-3 w-3` for inline detail), aligned with text
- For rankings or badges: use inline-flex circle with `h-6 w-6 rounded-full text-xs`

## 5. 📎 Buttons
- Primary action: `Button` component
- Secondary actions: `variant="outline"`
- Icon-only buttons: `variant="ghost"` with `size="icon"`
- Full-width action buttons: `w-full mt-4`
- Consistent spacing between buttons: `space-x-2` or `space-y-2` when stacked

## 6. 🏷 Badges & Status
- Use `Badge` component for status labels
- Variant logic (e.g. "Open" vs. "Hired") should map to semantic meaning, style applied via component
- Do not hardcode badge colors—use existing badge variants from system

## 7. 📐 Component Structure Principles
- Prefer `flex-1 min-w-0` for text blocks inside flexible containers to avoid overflow
- Avoid hardcoded widths—use responsive sizing
- Use utility classes instead of inline styles
- Components must be self-contained and reusable
- Follow logical hierarchy: heading → description → data/details

## 8. 📱 Responsiveness
- Mobile-first layout
- Use `md:` and `lg:` prefixes for grid adjustments, spacing, font resizing if needed
- Avoid fixed heights—let content define vertical space

## 9. 🔁 Spacing Conventions
- Between sections: `space-y-6` or `mb-6`
- Inside elements: `p-4` or `px-4 py-2` depending on content density
- Inline item gaps: `space-x-2` to `space-x-4`

## 10. 📚 Naming Convention (Optional but helpful)
- Use component-oriented names: `<UserCard />`, `<MetricsGrid />`, `<RecentActivityItem />`
- Group elements with shared structure into subcomponents for reusability 