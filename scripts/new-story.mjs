import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [slug,...terms]=process.argv.slice(2);const title=terms.join(' ')||slug;
if(!slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){console.error('Usage: npm run new:story -- culture-slug "Display title"');process.exit(1)}
const p=path.join(root,'content/stories',slug+'.json');if(fs.existsSync(p)){console.error('Story already exists:',slug);process.exit(1)}
const order=fs.readdirSync(path.join(root,'content/stories')).filter(x=>x.endsWith('.json')).length+1;
const blank={slug,order,category:'everyday',media:'REPLACE_WITH_APPROVED_MEDIA_ID',geography:'nationwide',name:{zh:title,en:title,my:'TODO'},eyebrow:{zh:'TODO',en:'TODO',my:'TODO'},teaser:{zh:'TODO',en:'TODO',my:'TODO'},story:{zh:'TODO',en:'TODO'},context:{zh:'TODO',en:'TODO'},moments:[{zh:'TODO',en:'TODO'},{zh:'TODO',en:'TODO'},{zh:'TODO',en:'TODO'}],note:{zh:'TODO',en:'TODO'},sources:[{title:'TODO',url:'https://example.org'}]};
fs.writeFileSync(p,JSON.stringify(blank,null,2)+'\n');console.log('Draft created:',p);console.log('Replace all TODO fields, register licensed media, verify sources; npm test rejects incomplete drafts.');
