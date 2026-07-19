// Maps the menu category IDs into 5 top-level tabs.
// Stable category IDs — labels live in i18n.menuPreview.tabs[].

export type MenuTabId =
  | 'specialties'
  | 'morning'
  | 'handhelds'
  | 'plates'
  | 'drinks'

export type MenuTabDef = {
  id: MenuTabId
  labelEN: string
  labelES: string
  emoji?: string
  // Category IDs that belong in this tab (rendered as accordions inside).
  categoryIds: string[]
}

export const MENU_TABS: MenuTabDef[] = [
  {
    id: 'specialties',
    labelEN: 'Specialties',
    labelES: 'Especialidades',
    categoryIds: ['fines-de-semana', 'platillos', 'mariscos', 'fajitas-alambres'],
  },
  {
    id: 'morning',
    labelEN: 'Morning',
    labelES: 'Mañana',
    categoryIds: ['desayuno', 'omelettes', 'chilaquiles'],
  },
  {
    id: 'handhelds',
    labelEN: 'Tacos & Antojitos',
    labelES: 'Tacos y Antojitos',
    categoryIds: [
      'tacos',
      'antojitos',
      'burritos-quesadillas',
      'tortas-cemitas',
      'enchiladas',
    ],
  },
  {
    id: 'plates',
    labelEN: 'Starters & Sides',
    labelES: 'Entradas y Sides',
    categoryIds: [
      'aperitivos',
      'ensaladas',
      'complementos',
      'kids',
      'postres',
    ],
  },
  {
    id: 'drinks',
    labelEN: 'Drinks & Bar',
    labelES: 'Bebidas y Barra',
    categoryIds: ['cocteles', 'cerveza', 'licores', 'jugos', 'bebidas-calientes'],
  },
]

export const DEFAULT_TAB: MenuTabId = 'specialties'

// Quick lookup: categoryId → tabId
export const CATEGORY_TO_TAB: Record<string, MenuTabId> = MENU_TABS.reduce(
  (acc, tab) => {
    tab.categoryIds.forEach((cid) => {
      acc[cid] = tab.id
    })
    return acc
  },
  {} as Record<string, MenuTabId>,
)
