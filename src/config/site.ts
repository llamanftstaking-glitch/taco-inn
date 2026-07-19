// =============================================================================
// Taco Inn — single source of truth for business info, branding, copy.
// Menu sourced from "TACO INN MENU 2.pdf" (Canva export, verified page-by-page
// against rendered pages 2026-07-18). Typos in the source were corrected.
// TODO(client): confirm items flagged in docs/OPEN-QUESTIONS.md
// =============================================================================

// Static export on GitHub Pages serves from /taco-inn/ — next/image with
// `unoptimized` does NOT apply basePath, so every asset path goes through this.
const asset = (p: string) => (process.env.NEXT_PUBLIC_BASE_PATH ?? '') + p

export const site = {
  name: 'Taco Inn',
  tagline: 'Comida Mexicana · Tacos, Antojitos & Cantina',
  shortDescription:
    'Authentic Mexican food in Washington Heights / Fort George — handmade tortillas, 11 meats, antojitos, mariscos and a full neon cantina bar on St. Nicholas Ave. Order pickup or delivery. ¡Comida mexicana de verdad!',
  url: 'https://tacoinnnyc.com', // TODO(client): confirm domain
  locale: 'en-US',

  foundingYear: 2018,
  areasServed: ['Washington Heights', 'Fort George', 'Inwood', 'Upper Manhattan'],
  deliveryZone: 'Washington Heights · Fort George · Upper Manhattan',

  // Placeholder AI food photography inherited from the template (/public/food).
  // TODO(client): replace with real Taco Inn photos.
  images: {
    heroBackground: asset('/food/tacos-spread.webp'),
    storyKitchen: asset('/food/tortillas-hands.webp'),
    interior: asset('/food/interior.webp'),
    birriaTacos: asset('/food/birria-tacos.webp'),
    birriaDunk: asset('/food/birria-dunk.webp'),
    alPastor: asset('/food/al-pastor.webp'),
    alPastor2: asset('/food/al-pastor-2.webp'),
    tacosSpread: asset('/food/tacos-spread.webp'),
    chilaquiles: asset('/food/chilaquiles.webp'),
    tacosOverhead: asset('/food/tacos-overhead.webp'),
    tortillaFire: asset('/food/tortilla-fire.webp'),
    sauceDrip: asset('/food/sauce-drip.webp'),
    steamDark: asset('/food/steam-dark.webp'),
    macroTaco: asset('/food/macro-taco.webp'),
    brothBowl: asset('/food/broth-bowl.webp'),
    pourStream: asset('/food/pour-stream.webp'),
    dipImpact: asset('/food/dip-impact.webp'),
    dipSplash: asset('/food/dip-splash.webp'),
    birriaHero: asset('/food/birria-hero.webp'),
    exteriorNight: asset('/food/exterior-night.webp'),
    tortillasPress: asset('/food/tortillas-press.webp'),
    grillFlames: asset('/food/grill-flames.webp'),
    cilantroPrep: asset('/food/cilantro-prep.webp'),
    consommePot: asset('/food/consomme-pot.webp'),
    cookPlating: asset('/food/cook-plating.webp'),
    quesabirriaPull: asset('/food/quesabirria-pull.webp'),
    tacoTrioOverhead: asset('/food/taco-trio-overhead.webp'),
    molePoblano: asset('/food/mole-poblano.webp'),
    chilaquilesBreakfast: asset('/food/chilaquiles-breakfast.webp'),
    carneAsada: asset('/food/carne-asada.webp'),
    loadedNachos: asset('/food/loaded-nachos.webp'),
    seafood: asset('/food/seafood.webp'),
    tamales: asset('/food/tamales.webp'),
    burritoCross: asset('/food/burrito-cross.webp'),
    salsaTrio: asset('/food/salsa-trio.webp'),
    friendsNight: asset('/food/friends-night.webp'),
    familyDining: asset('/food/family-dining.webp'),
    busyInterior: asset('/food/busy-interior.webp'),
    cheersDrinks: asset('/food/cheers-drinks.webp'),
    firstBite: asset('/food/first-bite.webp'),
    deliveryBag: asset('/food/delivery-bag.webp'),
    openLate: asset('/food/open-late.webp'),
    tableSpread: asset('/food/table-spread.webp'),
  },

  // "Most ordered" hero row. TODO(client): confirm actual best-sellers.
  bestSellers: [
    { name: 'Tacos (Handmade Tortilla)', price: '$3.25', image: asset('/food/tacos-spread.webp'), tagEN: 'House Classic', tagES: 'Clásico' },
    { name: 'Quesabirria + Consomé', price: '$15.00', image: asset('/food/quesabirria-pull.webp'), tagEN: 'Fan Favorite', tagES: 'Favorito' },
    { name: 'Molcajete Inn', price: '$28.00', image: asset('/food/carne-asada.webp'), tagEN: 'For Two', tagES: 'Para Dos' },
    { name: 'Barbacoa (Weekends)', price: '$15.00', image: asset('/food/broth-bowl.webp'), tagEN: 'Weekends Only', tagES: 'Fin de Semana' },
  ],

  contact: {
    address: '1495 St. Nicholas Ave',
    addressLine2: 'Near W 185th St',
    city: 'New York',
    state: 'NY',
    zip: '10033',
    neighborhood: 'Washington Heights · Fort George',
    phone: '(917) 388-2525',
    phoneAlt: '(917) 388-2525',
    phoneOrders: '(917) 388-2525',
    phoneE164: '+19173882525',
    phoneAltE164: '+19173882525',
    phoneOrdersE164: '+19173882525',
    email: '', // TODO(client): confirm email
    googleMapsUrl: 'https://maps.google.com/?q=1495+St+Nicholas+Ave+New+York+NY+10033',
  },

  // Hours per Google listing (confirm with client: menu prints a 10 AM
  // breakfast window but Google says doors open at 11).
  hours: {
    monday: '11:00 AM – 2:00 AM',
    tuesday: '11:00 AM – 2:00 AM',
    wednesday: '11:00 AM – 2:00 AM',
    thursday: '11:00 AM – 2:00 AM',
    friday: '11:00 AM – 2:00 AM',
    saturday: '11:00 AM – 2:00 AM',
    sunday: '11:00 AM – 2:00 AM',
  },
  hoursSummary: 'Open Daily · 11 AM – 2 AM',
  deliveryHoursSummary: 'Delivery & Pickup · Open Late',

  // Direct ordering runs on Toast (commission-free, goes straight to the
  // restaurant) — featured over the delivery apps.
  ordering: {
    direct:
      'https://www.toasttab.com/local/taco-inn-1495-st-nicholas-ave/r-93f35fd4-8a5a-4c25-800d-1610788ff6a8',
    pickup:
      'https://www.toasttab.com/local/taco-inn-1495-st-nicholas-ave/r-93f35fd4-8a5a-4c25-800d-1610788ff6a8',
    delivery: '',
    uberEats: 'https://www.ubereats.com/store/taco-inn/m_M1_z5JTiW6JL2UriDyRQ',
    grubhub:
      'https://www.grubhub.com/restaurant/taco-inn-1495-saint-nicholas-ave-new-york/1085883',
    seamless:
      'https://www.seamless.com/menu/taco-inn-1495-st-nicholas-ave-new-york/1085883',
    yelp: 'https://www.yelp.com/biz/taco-inn-new-york-2',
  },

  reviewUrl: '',

  // TODO(client): curate real quotes from Yelp (48 reviews) / TripAdvisor.
  reviews: [] as { author: string; source: string; quote: string; rating: number; cuisine: string }[],

  serviceStandard: {
    manager: '',
    summary: '',
  },

  aggregateRating: {
    sources: ['Google'],
    ratingValue: 4.1,
    reviewCount: 48,
  },

  brand: {
    // Neon cantina palette pulled from the printed menu: midnight navy,
    // hot pink, electric cyan, gold. (Keys kept from template for compat.)
    flagGreen: '#1FB6CB', // electric cyan
    flagGreenDark: '#12808F',
    flagRed: '#EC2E7B', // hot pink
    flagRedDark: '#C01A5E',
    flagWhite: '#FFFFFF',
    primary: '#EC2E7B',
    primaryDark: '#C01A5E',
    accent: '#1FB6CB',
    accentDark: '#12808F',
    gold: '#E6B229',
    cream: '#FFF6EE',
    masa: '#F2E2B8',
    night: '#232A45', // menu midnight navy
    text: '#FFFFFF',
  },

  social: {
    instagram: 'https://www.instagram.com/taco_innny',
    tiktok: '', // TODO(client): confirm
    facebook: '',
  },

  seo: {
    keywords: [
      'mexican restaurant washington heights',
      'tacos fort george nyc',
      'taco inn st nicholas ave',
      'handmade tortilla tacos nyc',
      'barbacoa weekends washington heights',
      'antojitos mexicanos nyc',
      'micheladas washington heights',
      'margarita flight uptown nyc',
      'pozole nyc',
    ],
  },
}

export type Lang = 'en' | 'es'

// ─────────────────────────────────────────────────────────────────────────────
// FULL MENU — single source of truth
// Verified against rendered menu pages. See docs/OPEN-QUESTIONS.md for the
// handful of prices that still need client confirmation.
// ─────────────────────────────────────────────────────────────────────────────
type MenuItem = { name: string; desc?: string; price: string; tag?: string }
type MenuCategory = {
  id: string
  name: string
  emoji?: string
  blurb?: string
  items: MenuItem[]
}

const menuES: MenuCategory[] = [
  {
    id: 'fines-de-semana',
    name: 'Fines de Semana',
    blurb: 'Solo sábado y domingo — los clásicos de la casa.',
    items: [
      { name: 'Pozole', price: '$13.50', tag: 'Chico $7.50' },
      { name: 'Pancita Grande', price: '$13.50', tag: 'Chica $7.50' },
      { name: 'Consomé de Borrego', price: '$13.50', tag: 'Chico $7.50' },
      { name: 'Barbacoa', price: '$15.00' },
      { name: 'Tacos de Barbacoa', price: '$3.50' },
    ],
  },
  {
    id: 'platillos',
    name: 'Platillos',
    blurb: 'Servidos con arroz, frijoles y ensalada.',
    items: [
      { name: 'Molcajete Inn', desc: 'Chuleta, pechuga, bistec, nopal, 4 camarones, chorizo, jalapeño, cebolla cambray y queso fresco. Con arroz, frijol y tortilla', price: '$28.00', tag: 'Para compartir' },
      { name: 'Bistec Ranchero', desc: 'Con jalapeño, cebolla y nopales asados', price: '$16.00' },
      { name: 'Cecina Ranchera', desc: 'Con jalapeño, cebolla y nopales asados', price: '$16.00' },
      { name: 'Quesabirria', desc: 'Servida con cilantro, cebolla y consomé pequeño', price: '$15.00' },
      { name: 'Bistec a la Mexicana · Encebollado · a la Plancha', price: '$15.00' },
      { name: 'Cecina a la Mexicana · Encebollada · a la Plancha', price: '$15.00' },
      { name: 'Pechuga Ranchera · a la Plancha', price: '$15.00' },
      { name: 'Pechuga a la Mexicana', desc: 'Con jalapeño, cebolla y tomate', price: '$14.50' },
      { name: 'Pechuga Empanizada', price: '$15.00' },
      { name: 'Bistec Empanizado', price: '$14.50' },
      { name: 'Chuleta de Cerdo', desc: 'En salsa verde o roja', price: '$15.00' },
      { name: 'Costilla', desc: 'En salsa verde o roja', price: '$14.00' },
      { name: 'Mole Poblano', price: '$14.50' },
      { name: 'Lunch de Mole Poblano', price: '$12.00' },
      { name: 'Caldo de Pollo', price: '$13.50', tag: 'Chico $7.50' },
      { name: 'Caldo de Res', price: '$14.00', tag: 'Chico $8.00' },
    ],
  },
  {
    id: 'mariscos',
    name: 'Mariscos',
    items: [
      { name: 'Caldo de Camarón', price: '$13.50' },
      { name: 'Aguachile', price: '$15.00' },
      { name: 'Camarones a la Diabla', price: '$14.50' },
      { name: 'Camarones a la Mexicana', price: '$14.00' },
      { name: 'Filete de Tilapia a la Plancha', desc: 'Con ensalada', price: '$13.00' },
      { name: 'Coctel de Camarones', price: '$13.00' },
      { name: 'Camarones a la Plancha', desc: 'Con ensalada', price: '$12.00' },
    ],
  },
  {
    id: 'fajitas-alambres',
    name: 'Fajitas & Alambres',
    blurb: 'Servidos con arroz, frijoles y tortillas.',
    items: [
      { name: 'Fajitas de Pollo', price: '$13.00' },
      { name: 'Fajitas de Bistec', price: '$13.00' },
      { name: 'Fajitas de Camarón', price: '$14.00' },
      { name: 'Fajitas Mixtas', price: '$14.00' },
      { name: 'Alambre de Camarón', desc: 'Pimientos, camarones, cebolla, tocino y queso Oaxaca fundido. Con tortillas de harina', price: '$15.50' },
      { name: 'Alambre Hawaiano', desc: 'Pimientos, pollo, bistec, jamón, piña, cebolla y quesillo', price: '$15.00' },
      { name: 'Alambre Inn', desc: 'Chorizo, bistec, chile poblano, nopales, cebolla y tocino. Con tortillas de maíz', price: '$15.00' },
      { name: 'Alambre Mixto', desc: 'Pimiento, camarón, pollo, bistec, tocino, cebolla y quesillo', price: '$15.00' },
      { name: 'Alambre de Pollo', price: '$15.00' },
      { name: 'Alambre de Bistec', price: '$15.00' },
    ],
  },
  {
    id: 'desayuno',
    name: 'Desayuno',
    blurb: '$9.00 de 10 AM a 12 PM · después de las 12 PM $10.00.',
    items: [
      { name: '3 Huevos Rancheros', desc: 'Con salchicha estilo mexicano, crema y queso', price: '$9 / $10' },
      { name: 'Huevos a la Mexicana', desc: 'Revueltos con tomate, cebolla y jalapeño', price: '$9 / $10' },
      { name: 'Huevos con Nopales', desc: 'Revueltos con cebolla y nopales', price: '$9 / $10' },
    ],
  },
  {
    id: 'omelettes',
    name: 'Omelettes',
    blurb: 'Con arroz, frijoles y tortilla o papas fritas. Después de las 12 PM $11.00.',
    items: [
      { name: 'Omelette Inn', desc: 'Mozzarella, jamón, tocino, vegetales y queso', price: '$10.50' },
      { name: 'Omelette Ranchero', desc: 'Nopales, chorizo y queso Oaxaca', price: '$10.50' },
      { name: 'Omelette con Champiñones', desc: 'Huevo, champiñones y queso mozzarella', price: '$10.50' },
      { name: 'Omelette a la Mexicana', desc: 'Tomate, jalapeño, cebolla y queso Oaxaca', price: '$10.50' },
    ],
  },
  {
    id: 'chilaquiles',
    name: 'Chilaquiles',
    blurb: 'Servidos con arroz y frijoles.',
    items: [
      { name: 'Chilaquiles Verdes o Rojos', desc: 'Con crema, queso fresco y cebolla', price: '$13.00' },
      { name: 'Chilaquiles con Carne o Huevo', desc: 'Con la carne de su elección', price: '$16.00' },
    ],
  },
  {
    id: 'tacos',
    name: 'Tacos',
    blurb: 'Tortilla hecha a mano · Pollo, bistec, cecina, chorizo, carnitas, al pastor, carne enchilada, lengua, suadero, oreja, buche o carne molida.',
    items: [
      { name: 'Taco Tradicional', desc: 'Cilantro y cebolla', price: '$3.25' },
      { name: 'Taco Estilo Americano', desc: 'Tomate, lechuga, cilantro, cebolla y queso en polvo', price: '$3.75' },
      { name: 'Tacos de Camarón', desc: 'Lechuga, pico de gallo y queso', price: '$4.25' },
      { name: 'Tacos de Pescado', desc: 'Tilapia frita, lechuga, pico de gallo y queso', price: '$4.00' },
      { name: 'Tacos Placeros con Carne', desc: 'Con arroz o puré de papa, huevo cocido y chiles', price: '$4.25' },
      { name: 'Taco Salad de Pollo', desc: 'Tortilla de harina frita, lechuga, vegetales, pollo, guacamole, crema, pico de gallo y mozzarella', price: '$7.50' },
      { name: 'Gringas (Orden de 2)', desc: 'Carne al pastor, quesillo, cilantro y cebolla', price: '$9.50' },
    ],
  },
  {
    id: 'antojitos',
    name: 'Antojitos',
    blurb: 'Hechos a mano, como en la plaza.',
    items: [
      { name: 'Nachos', desc: 'Carne de tu elección, frijoles fritos, queso, jalapeños, crema y aguacate', price: '$11.00' },
      { name: 'Gorditas', desc: 'Chicharrón o carne de tu elección, lechuga, cebolla, cilantro, queso en polvo y pico de gallo', price: '$5.50' },
      { name: 'Tacos Dorados (Orden de 4)', desc: 'Pollo o queso, con lechuga, pico de gallo, crema y queso fresco', price: '$11.00' },
      { name: 'Huaraches', desc: 'Salsa verde, cebolla, cilantro, carne de tu elección, lechuga, crema y queso', price: '$10.00' },
      { name: 'Sopes (Orden de 3)', desc: 'Frijoles refritos, carne de tu elección, lechuga, cilantro, cebolla y queso fresco', price: '$11.50' },
      { name: 'Picaditas', desc: 'Salsa verde o roja, cebolla, crema y queso fresco', price: '$9.50', tag: 'Carne +$1.00' },
      { name: 'Tlacoyos (Orden de 3)', desc: 'Tortilla rellena de frijoles refritos, nopales, ensalada, queso fresco y crema', price: '$11.00' },
      { name: 'Tlacoyo con Carne', price: '$11.50' },
      { name: 'Molletes (Orden de 2)', desc: 'Pan tostado con frijoles refritos con chorizo, pico de gallo, queso Oaxaca y aguacate', price: '$11.00' },
      { name: 'Molotitos de Tinga', desc: 'Rellenos de tinga con quesillo, servidos con crema', price: '$11.00' },
      { name: 'Pambazos', desc: 'Pan frito en salsa roja con puré de papa y chorizo, lechuga, crema y queso', price: '$10.50' },
    ],
  },
  {
    id: 'burritos-quesadillas',
    name: 'Burritos & Quesadillas',
    blurb: 'Tortilla de harina o maíz (maíz +$1.00), carne de tu elección, queso mozzarella, lechuga y pico de gallo.',
    items: [
      { name: 'Burrito', price: '$11.00' },
      { name: 'Burrito de Camarón', price: '$13.50' },
      { name: 'Quesadilla', price: '$11.00' },
      { name: 'Quesadilla de Camarón', price: '$13.50' },
      { name: 'Quesadilla de Vegetales Mixtos', price: '$11.00' },
      { name: 'Quesadilla de Flor de Calabaza', price: '$12.00' },
      { name: 'Quesadilla de Huitlacoche', price: '$12.00' },
      { name: 'Quesadilla de Champiñones', price: '$12.00' },
    ],
  },
  {
    id: 'tortas-cemitas',
    name: 'Tortas & Cemitas',
    blurb: 'Tortas con mayonesa, frijoles refritos, lechuga, tomate, cebolla, aguacate, jalapeño y mozzarella.',
    items: [
      { name: 'Torta de Milanesa de Pollo', price: '$10.50' },
      { name: 'Torta de Milanesa de Res', price: '$10.00' },
      { name: 'Torta de Pechuga a la Plancha', price: '$10.50' },
      { name: 'Torta al Pastor · Carnitas · Salchicha', price: '$10.50' },
      { name: 'Torta de Huevo con Chorizo', price: '$10.50' },
      { name: 'Torta Hawaiana', desc: 'Jamón, queso y piña', price: '$10.50' },
      { name: 'Torta Cubana', desc: 'Jamón, chorizo, quesillo, milanesa de pollo y huevo', price: '$13.00' },
      { name: 'Torta Inn', desc: 'Chuleta ahumada, milanesa de res, chorizo, quesillo, salchicha y jalapeño asado', price: '$13.00' },
      { name: 'Cemita Poblana', desc: 'Milanesa de res o pollo, cecina o carne enchilada — frijoles refritos, cebolla, aguacate, quesillo y chile chipotle', price: '$11.00' },
    ],
  },
  {
    id: 'enchiladas',
    name: 'Enchiladas',
    blurb: 'Servidas con arroz, frijoles, cebolla, crema y queso fresco.',
    items: [
      { name: 'Enchiladas Verdes o Rojas', price: '$12.00' },
      { name: 'Enchiladas de Mole Poblano o de Camarón', price: '$14.00' },
    ],
  },
  {
    id: 'aperitivos',
    name: 'Aperitivos',
    items: [
      { name: 'Guacamole con Chips', desc: 'Aguacate fresco, limón, cilantro y cebolla', price: '$9.50' },
      { name: 'Pico de Gallo con Chips', price: '$6.50' },
      { name: 'Queso Fundido', price: '$8.00' },
      { name: 'Alitas (Orden de 6)', desc: 'Buffalo o hot, con blue cheese y apio', price: '$7.50' },
      { name: 'Taquitos Fritos (Orden de 2)', desc: 'Queso o pollo, con crema, pico de gallo y guacamole', price: '$6.00' },
      { name: 'Tostadas (Orden de 2)', desc: 'Pollo, bistec, tinga o chorizo — frijoles refritos, lechuga, crema y queso cotija', price: '$9.00' },
      { name: 'Salsa con Chips', price: '$4.00' },
    ],
  },
  {
    id: 'ensaladas',
    name: 'Ensaladas',
    items: [
      { name: 'Ensalada de Pollo', desc: 'Pollo a la parrilla, lechuga, tomate, cebolla roja, rábano, pepino y aguacate', price: '$10.00' },
      { name: 'Ensalada de Aguacate', desc: 'Aguacate, lechuga, tomate y cebolla roja', price: '$7.00' },
      { name: 'Ensalada de Camarón', price: '$14.00' },
      { name: 'Ensalada de Tilapia', price: '$14.00' },
    ],
  },
  {
    id: 'complementos',
    name: 'Complementos',
    items: [
      { name: 'Orden de Cebolla Cambray', desc: 'Con nopal y jalapeño asado', price: '$10.00' },
      { name: 'Side de Guacamole (4 oz)', price: '$4.50' },
      { name: 'Orden de Tostones', price: '$4.50' },
      { name: 'Tortillas', price: '$4.00' },
      { name: 'Papas Fritas', price: '$4.00' },
    ],
  },
  {
    id: 'kids',
    name: 'Menú para Niños',
    items: [
      { name: 'Papas Fritas con Pechuga', desc: 'Chicken tenders con papas', price: '$6.00' },
      { name: 'Mini Sopes (2)', price: '$5.00' },
      { name: 'Mini Taquitos (2)', price: '$5.00' },
      { name: 'Arroz y Frijoles', price: '$4.00' },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    items: [
      { name: 'Churros con Helado', price: '$6.00' },
      { name: 'Pastel 3 Leches', price: '$4.50' },
      { name: 'Flan', price: '$4.50' },
    ],
  },
  {
    id: 'bebidas-calientes',
    name: 'Bebidas Calientes',
    items: [
      { name: 'Café de Olla', price: '$3 / $4', tag: 'Chico / Grande' },
      { name: 'Chocolate Caliente', price: '$3 / $4', tag: 'Chico / Grande' },
      { name: 'Té de Sabores', price: '$2.75' },
      { name: 'Arroz con Leche', price: '$2.75' },
    ],
  },
  {
    id: 'jugos',
    name: 'Aguas Frescas & Sodas',
    blurb: 'Hechas frescas — chica $3.00 · grande $6.00.',
    items: [
      { name: 'Horchata', price: '$3 / $6' },
      { name: 'Jamaica', price: '$3 / $6' },
      { name: 'Tamarindo', price: '$3 / $6' },
      { name: 'Soda de Jarritos', price: '$3.00' },
      { name: 'Soda de Lata', price: '$1.00' },
    ],
  },
  {
    id: 'cerveza',
    name: 'Cerveza',
    items: [
      { name: 'Botella', desc: 'Corona, Modelo, Negra Modelo, Victoria, Heineken, Pacífico', price: '' },
      { name: 'Draft', desc: 'Modelo, Heineken, Negra Modelo, Pacífico, Blue Point, Blue Moon, Goose Island, Stella', price: '' },
      { name: 'Michelada', desc: 'Cerveza mexicana preparada con limón, chile, Clamato y salsa inglesa', price: '' },
    ],
  },
  {
    id: 'licores',
    name: 'Tequila, Mezcal & Licores',
    blurb: 'Pregunta por la carta completa de la barra.',
    items: [
      { name: 'Tequilas', desc: 'Don Julio, Patrón, Casamigos, 1800, Hornitos, Jimador, Jose Cuervo, Cazadores, Tres Generaciones', price: '' },
      { name: 'Mezcales', desc: 'Casamigos, Montelobo, Rompe Corazón', price: '' },
      { name: 'Whisky', desc: 'Buchanan’s, Johnnie Walker, Jameson, Fireball, Jack Daniel’s', price: '' },
      { name: 'Cognac', desc: 'Courvoisier, Hennessy, Hennessy Black, Rémy Martin', price: '' },
      { name: 'Vodka · Ron · Champagne', desc: 'Absolut, Grey Goose, Tito’s, Bacardí, Capitán Morgan, Moët', price: '' },
    ],
  },
  {
    id: 'cocteles',
    name: 'Cócteles',
    blurb: 'La barra neón de la casa.',
    items: [
      { name: 'Bulldog Margarita', desc: 'Tequila, triple sec, limón, coronita — sabores opcionales', price: '' },
      { name: 'Margarita Flight', desc: 'Limón, fresa, maracuyá, tamarindo, mango, piña, zarzamora, pepino, jalapeño, coco', price: '' },
      { name: 'Paloma', desc: 'Tequila, jugo de toronja, Squirt, limón', price: '' },
      { name: 'Mojito', desc: 'Ron, hierbabuena, limón, azúcar, soda — sabores opcionales', price: '' },
      { name: 'Piña Colada', desc: 'Ron, coco, jugo de piña', price: '' },
      { name: 'Mezcal Negro', desc: 'Mezcal, zarzamora, triple sec, limón', price: '' },
      { name: 'Pitufo', desc: 'Ron Malibú, blue curaçao, coco, jugo de piña', price: '' },
      { name: 'Pink Panther', desc: 'Ron Malibú, granadina, coco, jugo de piña', price: '' },
      { name: 'Sangría', desc: 'Roja y maracuyá', price: '' },
      { name: 'Melon Maple Fizz', desc: 'Melón verde, Midori, gin, jarabe de maple, limón', price: '' },
      { name: 'Mezcalita', desc: 'Mezcal, limón, Tabasco, jarabe de agave', price: '' },
      { name: 'Green Eye Tiger', desc: 'Midori, tequila, limón, jarabe de jengibre, jugo de naranja', price: '' },
    ],
  },
]

export const menuEN: MenuCategory[] = [
  {
    id: 'fines-de-semana',
    name: 'Weekend Specials',
    blurb: 'Saturday & Sunday only — the house classics.',
    items: [
      { name: 'Pozole', price: '$13.50', tag: 'Small $7.50' },
      { name: 'Pancita (Beef Tripe Soup)', price: '$13.50', tag: 'Small $7.50' },
      { name: 'Lamb Consomé', price: '$13.50', tag: 'Small $7.50' },
      { name: 'Barbacoa', price: '$15.00' },
      { name: 'Barbacoa Tacos', price: '$3.50' },
    ],
  },
  {
    id: 'platillos',
    name: 'Entrees (Platillos)',
    blurb: 'Served with rice, beans & salad.',
    items: [
      { name: 'Molcajete Inn', desc: 'Pork chop, chicken, steak, cactus, 4 shrimp, chorizo, jalapeño, cambray onions & fresh cheese. With rice, beans & tortillas', price: '$28.00', tag: 'For Sharing' },
      { name: 'Bistec Ranchero', desc: 'Grilled steak with jalapeño, onions & grilled cactus', price: '$16.00' },
      { name: 'Cecina Ranchera', desc: 'Cured beef with jalapeño, onions & grilled cactus', price: '$16.00' },
      { name: 'Quesabirria', desc: 'Served with cilantro, onions & a small consomé', price: '$15.00' },
      { name: 'Steak — a la Mexicana · with Onions · Grilled', price: '$15.00' },
      { name: 'Cecina — a la Mexicana · with Onions · Grilled', price: '$15.00' },
      { name: 'Chicken Breast — Ranchera · Grilled', price: '$15.00' },
      { name: 'Chicken Breast a la Mexicana', desc: 'With jalapeño, onions & tomato', price: '$14.50' },
      { name: 'Breaded Chicken Breast', price: '$15.00' },
      { name: 'Breaded Steak', price: '$14.50' },
      { name: 'Pork Chops', desc: 'In red or green sauce', price: '$15.00' },
      { name: 'Pork Ribs', desc: 'In red or green sauce', price: '$14.00' },
      { name: 'Mole Poblano', price: '$14.50' },
      { name: 'Mole Poblano Lunch', price: '$12.00' },
      { name: 'Chicken Soup', price: '$13.50', tag: 'Small $7.50' },
      { name: 'Beef Soup', price: '$14.00', tag: 'Small $8.00' },
    ],
  },
  {
    id: 'mariscos',
    name: 'Seafood (Mariscos)',
    items: [
      { name: 'Shrimp Soup', price: '$13.50' },
      { name: 'Aguachile', price: '$15.00' },
      { name: 'Shrimp a la Diabla', price: '$14.50' },
      { name: 'Shrimp a la Mexicana', price: '$14.00' },
      { name: 'Grilled Tilapia Fillet', desc: 'Served with salad', price: '$13.00' },
      { name: 'Shrimp Cocktail', price: '$13.00' },
      { name: 'Grilled Shrimp', desc: 'Served with salad', price: '$12.00' },
    ],
  },
  {
    id: 'fajitas-alambres',
    name: 'Fajitas & Alambres',
    blurb: 'Served with rice, beans & tortillas.',
    items: [
      { name: 'Chicken Fajitas', price: '$13.00' },
      { name: 'Steak Fajitas', price: '$13.00' },
      { name: 'Shrimp Fajitas', price: '$14.00' },
      { name: 'Mixed Fajitas', price: '$14.00' },
      { name: 'Shrimp Alambre', desc: 'Peppers, baby shrimp, onions, bacon & melted Oaxaca cheese. With flour tortillas', price: '$15.50' },
      { name: 'Hawaiian Alambre', desc: 'Peppers, chicken, steak, ham, pineapple, onions & melted cheese', price: '$15.00' },
      { name: 'Alambre Inn', desc: 'Chorizo, steak, poblano strips, cactus, onions & bacon. With corn tortillas', price: '$15.00' },
      { name: 'Mixed Alambre', desc: 'Peppers, shrimp, chicken, steak, bacon, onions & melted cheese', price: '$15.00' },
      { name: 'Chicken Alambre', price: '$15.00' },
      { name: 'Steak Alambre', price: '$15.00' },
    ],
  },
  {
    id: 'desayuno',
    name: 'Breakfast',
    blurb: '$9.00 from 10 AM to 12 PM · after 12 PM $10.00.',
    items: [
      { name: '3 Huevos Rancheros', desc: 'Fried ranch eggs with Mexican-style sausage, sour cream & cheese', price: '$9 / $10' },
      { name: 'Huevos a la Mexicana', desc: 'Scrambled eggs with tomatoes, onions & jalapeño', price: '$9 / $10' },
      { name: 'Huevos con Nopales', desc: 'Scrambled eggs with onions & cactus', price: '$9 / $10' },
    ],
  },
  {
    id: 'omelettes',
    name: 'Omelettes',
    blurb: 'With rice, beans & tortilla or home fries. After 12 PM $11.00.',
    items: [
      { name: 'Omelette Inn', desc: 'Mozzarella, ham, bacon, vegetables & cheese', price: '$10.50' },
      { name: 'Omelette Ranchero', desc: 'Cactus, Mexican chorizo & Oaxaca cheese', price: '$10.50' },
      { name: 'Mushroom Omelette', desc: 'Eggs, mushrooms & mozzarella cheese', price: '$10.50' },
      { name: 'Omelette a la Mexicana', desc: 'Tomatoes, jalapeño, onions & Oaxaca cheese', price: '$10.50' },
    ],
  },
  {
    id: 'chilaquiles',
    name: 'Chilaquiles',
    blurb: 'Served with rice & beans.',
    items: [
      { name: 'Green or Red Chilaquiles', desc: 'With sour cream, fresh cheese & onion', price: '$13.00' },
      { name: 'Chilaquiles with Meat or Egg', desc: 'Your choice of meat', price: '$16.00' },
    ],
  },
  {
    id: 'tacos',
    name: 'Tacos',
    blurb: 'Handmade tortillas · Chicken, steak, cecina, chorizo, carnitas, al pastor, spicy pork, beef tongue, suadero, crispy pig ear, buche or ground beef.',
    items: [
      { name: 'Traditional Taco', desc: 'Cilantro & onions', price: '$3.25' },
      { name: 'American-Style Taco', desc: 'Tomato, lettuce, cilantro, onions & powdered cheese', price: '$3.75' },
      { name: 'Shrimp Tacos', desc: 'Baby shrimp, lettuce, pico de gallo & cheese', price: '$4.25' },
      { name: 'Fish Tacos', desc: 'Fried tilapia, lettuce, pico de gallo & cheese', price: '$4.00' },
      { name: 'Tacos Placeros with Meat', desc: 'With rice or mashed potatoes, boiled egg & hot peppers', price: '$4.25' },
      { name: 'Chicken Taco Salad', desc: 'Fried flour tortilla shell with lettuce, vegetables, chicken, guacamole, sour cream, pico de gallo & mozzarella', price: '$7.50' },
      { name: 'Gringas (Order of 2)', desc: 'Al pastor, Oaxaca cheese, cilantro & onions on flour tortillas', price: '$9.50' },
    ],
  },
  {
    id: 'antojitos',
    name: 'Antojitos',
    blurb: 'Handmade street classics.',
    items: [
      { name: 'Nachos', desc: 'Choice of meat, refried beans, cheese, jalapeños, sour cream & avocado', price: '$11.00' },
      { name: 'Gorditas', desc: 'Chicharrón or choice of meat, lettuce, onions, cilantro, powdered cheese & pico de gallo', price: '$5.50' },
      { name: 'Crispy Tacos — Dorados (Order of 4)', desc: 'Chicken or cheese, with lettuce, pico de gallo, sour cream & fresh cheese', price: '$11.00' },
      { name: 'Huaraches', desc: 'Salsa verde, onions, cilantro, choice of meat, lettuce, sour cream & cheese', price: '$10.00' },
      { name: 'Sopes (Order of 3)', desc: 'Refried beans, choice of meat, lettuce, cilantro, onions & fresh cheese', price: '$11.50' },
      { name: 'Picaditas', desc: 'Red or green salsa, onions, sour cream & fresh cheese', price: '$9.50', tag: 'Add meat +$1.00' },
      { name: 'Tlacoyos (Order of 3)', desc: 'Masa stuffed with refried beans — cactus salad, fresh cheese & sour cream', price: '$11.00' },
      { name: 'Tlacoyo with Meat', price: '$11.50' },
      { name: 'Molletes (Order of 2)', desc: 'Toasted bread with chorizo refried beans, pico de gallo, melted Oaxaca cheese & avocado', price: '$11.00' },
      { name: 'Molotitos de Tinga', desc: 'Stuffed with chicken tinga & cheese, served with sour cream', price: '$11.00' },
      { name: 'Pambazos', desc: 'Bread dipped in red sauce with mashed potato & chorizo — lettuce, sour cream & fresh cheese', price: '$10.50' },
    ],
  },
  {
    id: 'burritos-quesadillas',
    name: 'Burritos & Quesadillas',
    blurb: 'Flour or corn tortilla (corn +$1.00), choice of meat, mozzarella, lettuce & pico de gallo.',
    items: [
      { name: 'Burrito', price: '$11.00' },
      { name: 'Shrimp Burrito', price: '$13.50' },
      { name: 'Quesadilla', price: '$11.00' },
      { name: 'Shrimp Quesadilla', price: '$13.50' },
      { name: 'Mixed Vegetable Quesadilla', price: '$11.00' },
      { name: 'Squash Blossom Quesadilla', price: '$12.00' },
      { name: 'Huitlacoche Quesadilla', price: '$12.00' },
      { name: 'Mushroom Quesadilla', price: '$12.00' },
    ],
  },
  {
    id: 'tortas-cemitas',
    name: 'Tortas & Cemitas',
    blurb: 'Tortas come with mayo, refried beans, lettuce, tomato, onions, avocado, jalapeño & mozzarella.',
    items: [
      { name: 'Breaded Chicken Torta', price: '$10.50' },
      { name: 'Breaded Steak Torta', price: '$10.00' },
      { name: 'Grilled Chicken Torta', price: '$10.50' },
      { name: 'Al Pastor · Carnitas · Sausage Torta', price: '$10.50' },
      { name: 'Egg & Chorizo Torta', price: '$10.50' },
      { name: 'Hawaiian Torta', desc: 'Ham, cheese & pineapple', price: '$10.50' },
      { name: 'Torta Cubana', desc: 'Ham, chorizo, cheese, chicken milanesa & egg', price: '$13.00' },
      { name: 'Torta Inn', desc: 'Smoked pork chop, breaded steak, chorizo, cheese, sausage & roasted jalapeño', price: '$13.00' },
      { name: 'Cemita Poblana', desc: 'Breaded steak or chicken, cecina or spicy pork — refried beans, onions, avocado, Oaxaca cheese & chipotle', price: '$11.00' },
    ],
  },
  {
    id: 'enchiladas',
    name: 'Enchiladas',
    blurb: 'Served with rice, beans, onions, sour cream & fresh cheese.',
    items: [
      { name: 'Green or Red Enchiladas', price: '$12.00' },
      { name: 'Mole Poblano or Shrimp Enchiladas', price: '$14.00' },
    ],
  },
  {
    id: 'aperitivos',
    name: 'Appetizers',
    items: [
      { name: 'Guacamole with Chips', desc: 'Fresh avocado, lime, cilantro & onions', price: '$9.50' },
      { name: 'Pico de Gallo with Chips', price: '$6.50' },
      { name: 'Queso Fundido', desc: 'Melted cheese', price: '$8.00' },
      { name: 'Wings (Order of 6)', desc: 'Buffalo or hot sauce, with blue cheese & celery', price: '$7.50' },
      { name: 'Fried Taquitos (Order of 2)', desc: 'Cheese or chicken, with sour cream, pico de gallo & guacamole', price: '$6.00' },
      { name: 'Tostadas (Order of 2)', desc: 'Chicken, steak, tinga or chorizo — refried beans, lettuce, sour cream & cotija cheese', price: '$9.00' },
      { name: 'Salsa with Chips', price: '$4.00' },
    ],
  },
  {
    id: 'ensaladas',
    name: 'Salads',
    items: [
      { name: 'Grilled Chicken Salad', desc: 'Lettuce, tomato, red onions, radish, cucumber & avocado', price: '$10.00' },
      { name: 'Avocado Salad', desc: 'Avocado, lettuce, tomato & red onions', price: '$7.00' },
      { name: 'Shrimp Salad', price: '$14.00' },
      { name: 'Tilapia Salad', price: '$14.00' },
    ],
  },
  {
    id: 'complementos',
    name: 'Sides',
    items: [
      { name: 'Grilled Cambray Onions', desc: 'With cactus & roasted jalapeño', price: '$10.00' },
      { name: 'Side of Guacamole (4 oz)', price: '$4.50' },
      { name: 'Tostones', price: '$4.50' },
      { name: 'Tortillas', price: '$4.00' },
      { name: 'French Fries', price: '$4.00' },
    ],
  },
  {
    id: 'kids',
    name: "Kids' Menu",
    items: [
      { name: 'French Fries with Chicken Tenders', price: '$6.00' },
      { name: 'Mini Sopes (2)', price: '$5.00' },
      { name: 'Mini Taquitos (2)', price: '$5.00' },
      { name: 'Rice & Beans', price: '$4.00' },
    ],
  },
  {
    id: 'postres',
    name: 'Desserts',
    items: [
      { name: 'Churros with Ice Cream', price: '$6.00' },
      { name: 'Tres Leches Cake', price: '$4.50' },
      { name: 'Flan', price: '$4.50' },
    ],
  },
  {
    id: 'bebidas-calientes',
    name: 'Hot Drinks',
    items: [
      { name: 'Café de Olla', desc: 'Mexican-style coffee', price: '$3 / $4', tag: 'Sm / Lg' },
      { name: 'Hot Chocolate', price: '$3 / $4', tag: 'Sm / Lg' },
      { name: 'Flavored Tea', price: '$2.75' },
      { name: 'Arroz con Leche', desc: 'Rice pudding', price: '$2.75' },
    ],
  },
  {
    id: 'jugos',
    name: 'Aguas Frescas & Sodas',
    blurb: 'Made fresh — small $3.00 · large $6.00.',
    items: [
      { name: 'Horchata', price: '$3 / $6' },
      { name: 'Jamaica', desc: 'Hibiscus', price: '$3 / $6' },
      { name: 'Tamarindo', price: '$3 / $6' },
      { name: 'Jarritos', price: '$3.00' },
      { name: 'Canned Soda', price: '$1.00' },
    ],
  },
  {
    id: 'cerveza',
    name: 'Beer',
    items: [
      { name: 'Bottles', desc: 'Corona, Modelo, Negra Modelo, Victoria, Heineken, Pacífico', price: '' },
      { name: 'Draft', desc: 'Modelo, Heineken, Negra Modelo, Pacífico, Blue Point, Blue Moon, Goose Island, Stella', price: '' },
      { name: 'Michelada', desc: 'Mexican beer with lime, chili, Clamato & Worcestershire sauce', price: '' },
    ],
  },
  {
    id: 'licores',
    name: 'Tequila, Mezcal & Spirits',
    blurb: 'Ask about the full bar list.',
    items: [
      { name: 'Tequilas', desc: 'Don Julio, Patrón, Casamigos, 1800, Hornitos, Jimador, Jose Cuervo, Cazadores, Tres Generaciones', price: '' },
      { name: 'Mezcales', desc: 'Casamigos, Montelobo, Rompe Corazón', price: '' },
      { name: 'Whisky', desc: 'Buchanan’s, Johnnie Walker, Jameson, Fireball, Jack Daniel’s', price: '' },
      { name: 'Cognac', desc: 'Courvoisier, Hennessy, Hennessy Black, Rémy Martin', price: '' },
      { name: 'Vodka · Rum · Champagne', desc: 'Absolut, Grey Goose, Tito’s, Bacardí, Captain Morgan, Moët', price: '' },
    ],
  },
  {
    id: 'cocteles',
    name: 'Cocktails',
    blurb: 'The house neon bar.',
    items: [
      { name: 'Bulldog Margarita', desc: 'Tequila, triple sec, lime, topped with a Coronita — optional flavors', price: '' },
      { name: 'Margarita Flight', desc: 'Lime, strawberry, passion fruit, tamarind, mango, pineapple, blackberry, cucumber, jalapeño, coconut', price: '' },
      { name: 'Paloma', desc: 'Tequila, grapefruit juice, Squirt, lime', price: '' },
      { name: 'Mojito', desc: 'Rum, mint, lime, sugar, soda — optional flavors', price: '' },
      { name: 'Piña Colada', desc: 'Rum, coconut, pineapple juice', price: '' },
      { name: 'Mezcal Negro', desc: 'Mezcal, blackberry, triple sec, lime', price: '' },
      { name: 'Pitufo', desc: 'Malibu coconut rum, blue curaçao, coconut, pineapple juice', price: '' },
      { name: 'Pink Panther', desc: 'Malibu coconut rum, grenadine, coconut, pineapple juice', price: '' },
      { name: 'Sangría', desc: 'Red & passion fruit', price: '' },
      { name: 'Melon Maple Fizz', desc: 'Green melon, Midori, gin, maple syrup, lime', price: '' },
      { name: 'Mezcalita', desc: 'Mezcal, lime, Tabasco, agave syrup', price: '' },
      { name: 'Green Eye Tiger', desc: 'Midori, tequila, lime, ginger syrup, orange juice', price: '' },
    ],
  },
]

export { menuES }

export const i18n = {
  en: {
    nav: {
      menu: 'Menu',
      story: 'Our Story',
      visit: 'Visit',
      order: 'Order Online',
    },
    hero: {
      eyebrow: 'Washington Heights · Fort George · Open Daily to 2 AM',
      headline: 'Handmade Tortillas.\nEleven Meats.\nOne Neon Cantina.',
      sub: 'Tacos from $3.25 on tortillas pressed by hand. Weekend barbacoa & pozole. Margarita flights at the bar.',
      ctaPrimary: 'Order Online',
      ctaSecondary: 'See the Menu',
      special: 'Barbacoa, Pozole & Consomé — Weekends Only',
      trustBadge: 'Family-run kitchen & cantina on St. Nicholas Ave',
    },
    story: {
      title: 'Our Kitchen, Our Story',
      body: 'Taco Inn brings the food of the plaza to St. Nicholas Ave — tortillas pressed by hand for every taco, eleven meats on the trompo and the plancha, antojitos like the ones outside the mercado, and a neon-lit cantina pouring margarita flights and micheladas. Real Mexican cooking, hecho a mano.',
    },
    reviews: {
      eyebrow: 'Reviews · Reseñas',
      title: 'What Our Neighbors Say',
      sub: 'Rated on Yelp & TripAdvisor by Washington Heights.',
      standardEyebrow: 'Our Standard',
      standardTitle: 'Cooked to Order, Made It Right',
    },
    signature: {
      eyebrow: 'Our Signature',
      headline: { line1: 'LA TORTILLA', line2: 'HECHA A MANO.' },
      subtext: 'Pressed by hand for every single taco. Eleven meats. Cilantro, cebolla, and nothing you don’t need.',
      cta: 'Order Tacos',
    },
    editorial: {
      eyebrow: 'Hecho a Mano · Made by Hand',
      title: 'A kitchen, not a factory.',
      quote:
        '"Every tortilla is pressed to order. The barbacoa only comes out on weekends — when it’s gone, it’s gone."',
      attribution: 'La Casa · Taco Inn',
      body:
        'From gorditas and tlacoyos to molcajete for two, Taco Inn cooks the food of the plaza the slow way: masa pressed by hand, salsas made daily, and a weekend pot of pozole that draws the whole neighborhood up St. Nicholas Ave.',
      stats: [
        { value: '11', label: 'Meats for Your Taco' },
        { value: 'Daily', label: 'Tortillas Pressed' },
        { value: '10+', label: 'Margarita Flavors' },
      ],
    },
    menuPreview: {
      title: 'The Menu',
      sub: 'Full menu below — tacos, antojitos, platillos, mariscos and the whole cantina.',
      ctaFull: 'Order Online',
      ctaCall: 'Call the Restaurant',
      categories: menuEN,
    },
    visit: {
      title: 'Come Eat With Us',
      address: '1495 St. Nicholas Ave, New York, NY 10033',
      addressLine2: 'Fort George · Washington Heights',
      hours: 'Open Daily · 11:00 AM – 2:00 AM',
      directions: 'Get Directions',
      callUs: 'Call (917) 388-2525',
    },
    order: {
      title: 'Order in 30 Seconds',
      sub: 'Order direct through Toast — commission-free, straight to our kitchen. Or use your favorite app.',
      pickup: 'Order Direct',
      pickupBadge: 'Best Price',
      delivery: 'DoorDash',
      uberEats: 'Uber Eats',
      grubhub: 'Grubhub',
      seamless: 'Seamless',
      callIn: 'Call to Order',
      allergyNote:
        'Severe allergy? Call us first — we take it seriously and will guide your order.',
      deliveryHours: 'Open Daily 11 AM – 2 AM',
    },
    footer: {
      tagline: 'Handmade Mexican cooking & neon cantina on St. Nicholas Ave.',
      copy: '© 2026 Taco Inn. Todos los derechos reservados.',
    },
  },
  es: {
    nav: {
      menu: 'Menú',
      story: 'Historia',
      visit: 'Visítanos',
      order: 'Ordenar',
    },
    hero: {
      eyebrow: 'Washington Heights · Fort George · Abierto Hasta las 2 AM',
      headline: 'Tortillas a Mano.\nOnce Carnes.\nUna Cantina de Neón.',
      sub: 'Tacos desde $3.25 en tortilla hecha a mano. Barbacoa y pozole los fines de semana. Margarita flights en la barra.',
      ctaPrimary: 'Ordenar en Línea',
      ctaSecondary: 'Ver el Menú',
      special: 'Barbacoa, Pozole y Consomé — Solo Fines de Semana',
      trustBadge: 'Cocina y cantina familiar en St. Nicholas Ave',
    },
    story: {
      title: 'Nuestra Cocina, Nuestra Historia',
      body: 'Taco Inn trae la comida de la plaza a St. Nicholas Ave — tortillas hechas a mano para cada taco, once carnes en el trompo y la plancha, antojitos como los del mercado y una cantina de neón con margaritas y micheladas. Cocina mexicana de verdad, hecha a mano.',
    },
    reviews: {
      eyebrow: 'Reseñas',
      title: 'Lo Que Dicen los Vecinos',
      sub: 'Calificado en Yelp y TripAdvisor por Washington Heights.',
      standardEyebrow: 'Nuestro Estándar',
      standardTitle: 'Al Momento y Bien Hecho',
    },
    signature: {
      eyebrow: 'Nuestra Firma',
      headline: { line1: 'LA TORTILLA', line2: 'HECHA A MANO.' },
      subtext: 'Prensada a mano para cada taco. Once carnes. Cilantro, cebolla y nada que no necesites.',
      cta: 'Pide Tus Tacos',
    },
    editorial: {
      eyebrow: 'Hecho a Mano',
      title: 'Una cocina, no una fábrica.',
      quote:
        '"Cada tortilla se prensa al momento. La barbacoa solo sale los fines de semana — cuando se acaba, se acabó."',
      attribution: 'La Casa · Taco Inn',
      body:
        'De las gorditas y tlacoyos al molcajete para dos, Taco Inn cocina la comida de la plaza a la antigua: masa prensada a mano, salsas hechas a diario y una olla de pozole de fin de semana que junta a todo el barrio en St. Nicholas Ave.',
      stats: [
        { value: '11', label: 'Carnes Para Tu Taco' },
        { value: 'Diario', label: 'Tortillas a Mano' },
        { value: '10+', label: 'Sabores de Margarita' },
      ],
    },
    menuPreview: {
      title: 'El Menú',
      sub: 'Menú completo abajo — tacos, antojitos, platillos, mariscos y toda la cantina.',
      ctaFull: 'Ordenar en Línea',
      ctaCall: 'Llamar al Restaurante',
      categories: menuES,
    },
    visit: {
      title: 'Ven a Comer con Nosotros',
      address: '1495 St. Nicholas Ave, Nueva York, NY 10033',
      addressLine2: 'Fort George · Washington Heights',
      hours: 'Abierto Todos los Días · 11:00 AM – 2:00 AM',
      directions: 'Ver Direcciones',
      callUs: 'Llamar (917) 388-2525',
    },
    order: {
      title: 'Ordena en 30 Segundos',
      sub: 'Pedido directo por Toast — sin comisión, directo a la cocina. O usa tu app favorita.',
      pickup: 'Pedido Directo',
      pickupBadge: 'Mejor Precio',
      delivery: 'DoorDash',
      uberEats: 'Uber Eats',
      grubhub: 'Grubhub',
      seamless: 'Seamless',
      callIn: 'Llamar',
      allergyNote:
        '¿Alergia severa? Llámanos primero — lo tomamos en serio y te guiamos en tu pedido.',
      deliveryHours: 'Abierto Todos los Días 11 AM – 2 AM',
    },
    footer: {
      tagline: 'Cocina mexicana hecha a mano y cantina de neón en St. Nicholas Ave.',
      copy: '© 2026 Taco Inn. Todos los derechos reservados.',
    },
  },
}
