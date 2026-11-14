import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.argv[2];if(!base||!base.startsWith('https://'))throw Error('Indica una URL HTTPS.');
const cookies={},results=[];let tripId,r1,r2,closeId;
async function call(path,method='GET',body,actor='driver'){let r=await fetch(base+'/api/'+path,{method,headers:{...(cookies[actor]?{cookie:cookies[actor]}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});let j=await r.json();return {status:r.status,body:j,cookie:r.headers.get('set-cookie')};}
async function check(id,fn){await fn();results.push({criterion:id,pass:true,at:new Date().toISOString()});console.log('PASS '+id)}
try{
await check('H-01-CA1',async()=>{for(let [a,e]of [['driver','conductor'],['p1','pasajero'],['p2','pasajero2']]){let r=await call('login','POST',{email:e+'@ecoruta.test',password:'EcoRuta2026!'},a);assert.equal(r.status,200);cookies[a]=r.cookie.split(';')[0];assert.ok((await call('session','GET',null,a)).body.user)}});
await check('H-01-CA2',async()=>{assert.equal((await call('login','POST',{email:'pasajero@ecoruta.test',password:'error'},'none')).status,401);assert.equal((await call('trips','GET',null,'none')).status,401)});
const data={origin:'Prueba técnica '+Date.now(),destination:'Campus Tecsup',departure:new Date(Date.now()+600000).toISOString(),meeting:'Plaza ficticia de pruebas',capacity:1,cost:4.5};
await check('H-02-CA1',async()=>{let r=await call('trips','POST',data);assert.equal(r.status,201);tripId=r.body.id});
await check('H-02-CA2',async()=>{assert.equal((await call('trips','POST',{...data,capacity:0})).status,400);assert.equal((await call('trips','POST',{...data,departure:'2020-01-01'})).status,400)});
const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(data.departure));
const query='trips?'+new URLSearchParams({origin:data.origin,date:day});
await check('H-03-CA1',async()=>{let r=await call(query,'GET',null,'p1');assert.equal(r.body.trips.length,1);let t=r.body.trips[0];assert.equal(t.id,tripId);assert.equal(t.cost,4.5);assert.equal(t.available,1);assert.equal(t.meeting,data.meeting)});
await check('H-03-CA2',async()=>assert.equal((await call('trips?origin=INEXISTENTE-EXACTO-123xyz','GET',null,'p1')).body.trips.length,0));
await check('H-04-CA1',async()=>{let r=await call('trips/'+tripId+'/request','POST',null,'p1');assert.equal(r.status,201);r1=r.body.id;assert.equal((await call(query)).body.trips[0].available,1)});
await check('H-04-CA2',async()=>{assert.equal((await call('trips/'+tripId+'/request','POST',null,'p1')).status,409);let r=await call('trips/'+tripId+'/request','POST',null,'p2');assert.equal(r.status,201);r2=r.body.id});
await check('H-05-CA1',async()=>assert.equal((await call('requests/'+r1+'/decision','POST',{status:'accepted'},'p1')).status,403));
let winner,loser;
await check('H-05-CA2',async()=>{let r=await Promise.all([call('requests/'+r1+'/decision','POST',{status:'accepted'}),call('requests/'+r2+'/decision','POST',{status:'accepted'})]);assert.deepEqual(r.map(x=>x.status).sort(),[200,409]);winner=r[0].status===200?'p1':'p2';loser=winner==='p1'?'p2':'p1';assert.equal((await call(query)).body.trips[0].available,0)});
await check('H-06-CA1',async()=>{let r=(await call('requests','GET',null,winner)).body.requests.find(x=>x.trip_id===tripId);assert.equal(r.status,'accepted');assert.equal(r.meeting,data.meeting)});
await check('H-06-CA2',async()=>{await call('logout','POST',null,winner);let r=await call('login','POST',{email:(winner==='p1'?'pasajero':'pasajero2')+'@ecoruta.test',password:'EcoRuta2026!'},winner);cookies[winner]=r.cookie.split(';')[0];assert.equal((await call('requests','GET',null,winner)).body.requests.find(x=>x.trip_id===tripId).status,'accepted');let own=(await call('requests','GET',null,loser)).body.requests;assert.ok(own.every(x=>x.passenger_id!==(winner==='p1'?'passenger-1':'passenger-2')))});
await check('H-07-CA1',async()=>{let id=winner==='p1'?r1:r2;assert.equal((await call('requests/'+id+'/withdraw','POST',null,winner)).status,200);assert.equal((await call(query)).body.trips[0].available,1)});
await check('H-07-CA2',async()=>{assert.equal((await call('trips/'+tripId+'/cancel','POST')).status,200);assert.equal((await call(query)).body.trips.length,0);assert.equal((await call('requests','GET',null,loser)).body.requests.find(x=>x.trip_id===tripId).status,'cancelled')});
await check('H-08-CA1',async()=>{let r=await call('trips','POST',{...data,origin:'Prueba cierre técnico',departure:new Date(Date.now()+8000).toISOString()});assert.equal(r.status,201);closeId=r.body.id;assert.equal((await call('trips/'+closeId+'/complete','POST')).status,409)});
await new Promise(r=>setTimeout(r,8500));
await check('H-08-CA2',async()=>{assert.equal((await call('trips/'+closeId+'/complete','POST')).status,200);assert.equal((await call('mine')).body.trips.find(x=>x.id===closeId).status,'completed');assert.equal((await call('trips/'+closeId+'/request','POST',null,'p1')).status,409)});
for(let a of ['driver','p1','p2'])await call('logout','POST',null,a);
fs.writeFileSync('docs/VERIFICACION_EN_LINEA.json',JSON.stringify({url:base,checkedAt:new Date().toISOString(),sourceCommit:'b9dd1b856d69bd0d875bbf1179776262804c4d2a',kind:'Pruebas HTTP contra la versión desplegada. No sustituye comprobación visual en incógnito ni entrevistas. La reapertura de base se verificó localmente; en línea se verificó continuidad tras nuevo acceso.',testTrips:[tripId,closeId],results},null,2));
console.log('16 criterios verificados por HTTP en producción.');
}catch(e){console.error(e);fs.writeFileSync('docs/VERIFICACION_EN_LINEA.json',JSON.stringify({url:base,checkedAt:new Date().toISOString(),results,error:e.message},null,2));process.exitCode=1;}
