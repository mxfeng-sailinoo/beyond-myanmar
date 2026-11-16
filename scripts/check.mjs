import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const site=read('content/site.json'),media=read('content/media.json'),phrases=read('content/phrases.json');
const fsdir=p=>fs.readdirSync(path.join(root,p)).filter(f=>f.endsWith('.json'));
const files=fsdir('content/stories');
const slugs=new Set(),orders=new Set();let checks=0;
function assert(test,message){checks++;if(!test)throw new Error(message)}
assert(files.length>0,'No stories');assert(site.categories.length>0,'No categories');
for(const f of files){let o=read('content/stories/'+f);const fields=['slug','order','category','media','name','eyebrow','teaser','story','context','moments','note','sources'];
 for(const k of fields)assert(o[k]!==undefined,`${f}: missing ${k}`);
 assert(o.slug===f.replace(/\.json$/,''),`${f}: slug != filename`);assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(o.slug),`${f}: invalid slug`);assert(!slugs.has(o.slug),`${f}: duplicate slug`);slugs.add(o.slug);assert(!orders.has(o.order),`${f}: duplicate order`);orders.add(o.order);
 assert(site.categories.some(c=>c.id===o.category),`${f}: unknown category`);assert(!!media[o.media],`${f}: unknown media`);assert(o.moments.length===3,`${f}: exactly 3 moments required`);assert(o.sources.length>0,`${f}: missing sources`);
 for(const field of ['name','eyebrow','teaser'])for(const lang of ['zh','en','my'])assert(typeof o[field]?.[lang]==='string'&&o[field][lang].trim(),`${f}: ${field}.${lang} incomplete`);
 for(const field of ['story','context','note'])for(const lang of ['zh','en'])assert(typeof o[field]?.[lang]==='string'&&o[field][lang].trim(),`${f}: ${field}.${lang} incomplete`);
 for(const [i,m] of o.moments.entries())for(const lang of ['zh','en'])assert(!!m[lang]?.trim(),`${f}: moment ${i} ${lang} missing`);
 for(const s of o.sources)assert(/^https:\/\//.test(s.url)&&s.title,`${f}: invalid source`);
 for(const word of Object.values(o))if(typeof word==='string')assert(!/TODO|TBD|lorem ipsum/i.test(word),`${f}: unfinished placeholder`);
}
for(const [id,m] of Object.entries(media)){
 for(const field of ['author','license','caption'])assert(!!m[field],`media ${id}: ${field} missing`);
 assert(!!m.caption.zh && !!m.caption.en,`media ${id}: caption translations missing`);
 if(m.localFile){
  assert(/^[a-z0-9][a-z0-9_-]*\.(jpe?g|png|webp)$/i.test(m.localFile),`media ${id}: unsafe photo filename`);
  assert(fs.existsSync(path.join(root,'assets/images',m.localFile)),`media ${id}: local image does not exist`);
  assert(!m.source && !m.licenseUrl,`media ${id}: remove old Commons source/licenseUrl when using your own photograph`);
 }else{
  for(const field of ['file','licenseUrl','source'])assert(!!m[field],`media ${id}: ${field} missing`);
  assert(m.source.startsWith('https://commons.wikimedia.org/wiki/File:'),`media ${id}: invalid Commons source`);
  assert(/^CC BY/.test(m.license),`media ${id}: license not on allow-list`);
 }
}
for(const p of phrases){
 assert(!!p.my&&!!p.zh&&!!p.en&&!!p.source,`phrase ${p.id}: incomplete`);
 assert(['licensed-recording','pending-verification','verified-tts','personal-recording'].includes(p.audio.status),`phrase ${p.id}: bad audio status`);
 if(p.audio.status==='personal-recording'){
  assert(/^[a-z0-9][a-z0-9_-]*\.(mp3|wav|ogg|m4a)$/i.test(p.audio.localFile||''),`phrase ${p.id}: local audio filename missing/invalid`);
  assert(fs.existsSync(path.join(root,'assets/audio',p.audio.localFile)),`phrase ${p.id}: audio file does not exist`);
  assert(!!p.audio.author && !!p.audio.license,`phrase ${p.id}: own recording requires author and usage rights`);
 }else if(p.audio.status!=='pending-verification'){
  assert(!!p.audio.url && !!p.audio.filePage,`phrase ${p.id}: audio source missing`);
 }
}

for(const loc of site.locations){assert(loc.lat>=9&&loc.lat<=29&&loc.lon>=92&&loc.lon<=102,`location ${loc.id} outside Myanmar map bounds`);assert(slugs.has(loc.story),`location ${loc.id} unknown story`)}
const pages=['index.html','explore/index.html','map/index.html','about/index.html',...files.map(f=>'stories/'+f.slice(0,-5)+'/index.html')];for(const p of pages){assert(fs.existsSync(path.join(root,'docs',p)),`missing generated page ${p}`);let html=fs.readFileSync(path.join(root,'docs',p),'utf8');assert(html.includes('BEYOND'),`empty page ${p}`)}
for(const f of ['AGENTS.md','README.md']){let contents=fs.readFileSync(path.join(root,f),'utf8');assert(!/作業|評分|繳交|課堂|助教|homework|assignment|grading|submission|coursework/i.test(contents),`${f} mentions classroom/task instructions`)}
console.log(`PASS: ${checks} validations, ${files.length} story files, ${pages.length} generated pages, ${Object.keys(media).length} media attributions, ${phrases.length} language entries.`);
