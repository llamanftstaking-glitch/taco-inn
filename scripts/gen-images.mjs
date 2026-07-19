// FAL flux-pro/v1.1-ultra batch generator for El Pitallito.
// Native fetch (node 18+). No deps. Downloads JPEG, leaves cwebp to a post step.
import fs from 'node:fs';
import path from 'node:path';

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error('FAL_KEY missing'); process.exit(1); }

const OUT = path.resolve('public/food');
const RAW = path.resolve('.gen-raw');
fs.mkdirSync(RAW, { recursive: true });

const STYLE = ' ultra realistic food photography, authentic mexican restaurant, warm cinematic lighting, shallow depth of field, steam visible, natural imperfections, handcrafted food, NYC neighborhood restaurant energy, rich textures, appetizing, professional commercial food photography, moody shadows, realistic plating, not overly styled, high detail';
const NEG = 'cartoon, illustration, cgi, 3d render, plastic, oversaturated, watermark, text, logo, deformed, ugly, low quality, blurry, extra fingers';

// name, aspect_ratio, base prompt (style suffix appended automatically)
const JOBS = [
  ['birria-hero','16:9','close-up of authentic birria tacos on handmade corn tortillas, melted cheese stretching, rich red consomme being poured into a small bowl, steam rising heavily, chopped cilantro and onions, charred tortilla edges, juicy slow cooked beef visible, rustic mexican table setting, dramatic warm lighting, cinematic composition, intense food craving energy'],
  ['exterior-night','16:9','small authentic mexican restaurant glowing at night in washington heights nyc, warm interior lights visible through windows, people inside eating tacos, neon reflections on wet street, cinematic urban atmosphere, cozy late-night energy, realistic documentary photography style'],
  ['tortillas-press','4:3','hands pressing fresh handmade corn tortillas in a mexican kitchen, masa dough texture visible, warm kitchen lighting, flour particles in the air, rustic cooking station, authentic mexican cooking process, cinematic close-up, motion and energy, handcrafted traditional food preparation'],
  ['grill-flames','4:3','mexican cook working over a hot grill in a busy restaurant kitchen, flames rising, tacos cooking on flat top grill, smoke and steam everywhere, dramatic action shot, authentic kitchen energy, cinematic realism, handcrafted mexican food preparation'],
  ['cilantro-prep','4:3','fresh cilantro and white onions being chopped rapidly on a wooden cutting board in an authentic mexican kitchen, knife motion blur, fresh ingredients everywhere, vibrant greens, warm rustic lighting, cinematic food preparation photography'],
  ['consomme-pot','4:3','large pot of rich birria consomme simmering slowly in a mexican kitchen, deep red broth, steam filling the air, authentic cooking process, dramatic warm lighting, rustic kitchen realism, cinematic close-up food photography'],
  ['cook-plating','4:3','mexican cook carefully plating tacos in a busy authentic restaurant kitchen, hands in focus, tacos steaming hot, warm cinematic lighting, realistic restaurant atmosphere, handcrafted mexican food, documentary photography style'],
  ['quesabirria-pull','4:3','extreme close-up of quesabirria taco being pulled apart with melted cheese stretch, juicy shredded beef, crispy grilled tortilla, dripping consomme, cilantro and onions falling naturally, steam rising intensely, dramatic food photography, irresistible mexican comfort food'],
  ['taco-trio-overhead','1:1','overhead shot of three authentic mexican tacos on handmade corn tortillas, different meats, lime wedges, salsa bowls, chopped cilantro and onions, rustic wooden table, colorful vibrant mexican food photography'],
  ['mole-poblano','4:3','authentic mole poblano plated beautifully, dark glossy mole sauce over chicken, sesame seeds sprinkled on top, mexican rice and handmade tortillas on the side, steam rising, deep rich sauce texture, warm rustic mexican restaurant atmosphere, cinematic overhead angle'],
  ['chilaquiles-breakfast','4:3','traditional mexican chilaquiles with salsa verde, crema, queso fresco, eggs, avocado slices, steaming hot plate, authentic breakfast presentation, warm morning sunlight, cozy mexican restaurant atmosphere'],
  ['carne-asada','4:3','juicy carne asada plate with grilled steak slices, mexican rice, beans, grilled onions, handmade tortillas, smoky grill marks, steam rising, rustic mexican restaurant plating, cinematic food photography'],
  ['loaded-nachos','4:3','loaded mexican nachos covered with melted cheese, guacamole, jalapenos, sour cream, shredded beef, pico de gallo, dramatic cheese texture, vibrant colors, warm restaurant lighting'],
  ['seafood','4:3','authentic mexican seafood dish with grilled shrimp, lime, fresh cilantro, spicy red sauce, rustic mexican plating, vibrant seafood textures, steam rising, cinematic food photography'],
  ['tamales','4:3','traditional mexican tamales partially opened from corn husk, steam rising heavily, rich masa texture visible, rustic authentic presentation, warm cinematic lighting, handcrafted comfort food photography'],
  ['burrito-cross','4:3','cut open mexican burrito showing juicy meat, rice, beans, cheese, salsa, guacamole layers, melted cheese texture, warm dramatic lighting, authentic street food presentation'],
  ['salsa-trio','4:3','three authentic mexican salsas in rustic bowls, vibrant red and green colors, tortilla chips nearby, dramatic texture photography, fresh ingredients visible, warm rustic table setting'],
  ['friends-night','4:3','friends eating tacos late at night inside a cozy washington heights mexican restaurant, neon reflections from outside, warm laughter, tacos and mexican drinks on the table, authentic nyc neighborhood energy, cinematic documentary photography style, emotional and vibrant atmosphere'],
  ['family-dining','4:3','multi-generational latino family enjoying authentic mexican food together in warm restaurant atmosphere, tacos and plates covering the table, emotional candid moment, documentary photography style'],
  ['busy-interior','16:9','busy authentic mexican restaurant during dinner rush, servers moving quickly, packed tables, warm lighting, steam and motion everywhere, energetic nyc neighborhood restaurant atmosphere, cinematic realism'],
  ['cheers-drinks','4:3','friends cheering with horchata and mexican sodas over a table full of tacos, vibrant colors, warm lighting, authentic mexican restaurant atmosphere, documentary food photography style'],
  ['first-bite','4:3','close emotional candid shot of customer taking first bite of authentic mexican taco, visible excitement and enjoyment, cinematic restaurant photography, warm cozy atmosphere'],
  ['delivery-bag','4:3','fresh authentic mexican tacos packed carefully into takeout containers beside branded delivery bags, steam still rising, realistic food delivery photography, warm cinematic lighting, appetizing presentation'],
  ['open-late','16:9','authentic mexican restaurant serving food late at night, glowing warm lights, tacos on tables, urban nyc atmosphere outside, cozy midnight dining energy'],
  ['table-spread','16:9','large mexican feast spread across rustic table including birria tacos, mole poblano, chilaquiles, salsas, drinks, tortillas, guacamole, vibrant colors, steam rising from multiple dishes, cinematic overhead food photography'],
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function gen([name, ratio, base]) {
  const dest = path.join(RAW, `${name}.jpg`);
  if (fs.existsSync(dest)) { console.log(`skip ${name} (exists)`); return; }
  const body = {
    prompt: base + STYLE,
    aspect_ratio: ratio,
    num_images: 1,
    output_format: 'jpeg',
    enable_safety_checker: false,
  };
  const sub = await fetch('https://queue.fal.run/fal-ai/flux-pro/v1.1-ultra', {
    method: 'POST',
    headers: { Authorization: `Key ${FAL_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!sub.ok) throw new Error(`${name} submit ${sub.status}: ${await sub.text()}`);
  const { status_url, response_url } = await sub.json();
  for (let i = 0; i < 90; i++) {
    await sleep(2000);
    const s = await (await fetch(status_url, { headers: { Authorization: `Key ${FAL_KEY}` } })).json();
    if (s.status === 'COMPLETED') break;
    if (s.status === 'FAILED' || s.error) throw new Error(`${name} failed: ${JSON.stringify(s)}`);
    if (i === 89) throw new Error(`${name} timeout`);
  }
  const res = await (await fetch(response_url, { headers: { Authorization: `Key ${FAL_KEY}` } })).json();
  const url = res.images?.[0]?.url;
  if (!url) throw new Error(`${name} no image: ${JSON.stringify(res)}`);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`done ${name} (${(buf.length/1024).toFixed(0)}KB)`);
}

// Run with limited concurrency.
const LIMIT = 4;
let idx = 0, fails = [];
async function worker() {
  while (idx < JOBS.length) {
    const job = JOBS[idx++];
    try { await gen(job); } catch (e) { console.error(String(e.message||e)); fails.push(job[0]); }
  }
}
await Promise.all(Array.from({ length: LIMIT }, worker));
console.log(fails.length ? `FAILS: ${fails.join(',')}` : 'ALL OK');
