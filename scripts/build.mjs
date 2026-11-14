import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
let files=['common','auth','publish','search','ask','decision','tracking','cancellation','completion','worker'];let result='';
for(let file of files){let source=readFileSync('src/'+file+'.js','utf8');source=source.replace(/^import .*?;\r?\n/gm,'');source=source.replace(/export (class|const|async function|function)/g,'$1');if(file!=='worker')source=source.replace(/export default/g,'');result+=source+'\n';}
let html=readFileSync('src/page.html','utf8');mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});writeFileSync('dist/server/index.js','const HTML='+JSON.stringify(html)+';\n'+result);writeFileSync('dist/.openai/hosting.json',readFileSync('.openai/hosting.json'));
console.log('EcoRuta Worker compilado sin dependencias.');
