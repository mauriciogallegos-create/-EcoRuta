import {json,Problem,demand,body} from './common.js';
import {session,login,logout} from './auth.js';
import {publish} from './publish.js';
import {search} from './search.js';
import {mine,requests} from './tracking.js';
import {cancelTrip,withdraw} from './cancellation.js';
import {completeTrip} from './completion.js';
import {ask} from './ask.js';
import {decide} from './decision.js';
import {HTML} from './page.js';
export default {async fetch(req,env){let url=new URL(req.url),path=url.pathname;try{
if(path==='/')return new Response(HTML,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"}});
if(path==='/favicon.ico')return new Response(null,{status:204});
if(path==='/api/health')return json({ok:true,app:'EcoRuta',storage:env.DB?'configured':'unavailable'});
demand(path.startsWith('/api/'),404,'Página no encontrada.');demand(env.DB,503,'La base de datos no está disponible.');let db=env.DB,method=req.method;
if(method!=='GET'){demand(['POST'].includes(method),405,'Método no permitido.');let origin=req.headers.get('origin');demand(!origin||origin===url.origin,403,'Origen de solicitud no permitido.');}
if(path==='/api/login'&&method==='POST')return await login(req,db);
let user=await session(req,db);if(path==='/api/session'&&method==='GET')return json({user});demand(user,401,'Inicia sesión para continuar.');
if(path==='/api/logout'&&method==='POST')return await logout(req,db);
if(path==='/api/trips'&&method==='GET')return await search(req,db);
if(path==='/api/trips'&&method==='POST')return await publish(req,db,user);
if(path==='/api/mine'&&method==='GET')return await mine(db,user);
if(path==='/api/requests'&&method==='GET')return await requests(db,user);
let m=path.match(/^\/api\/trips\/([\w-]+)\/(request|cancel|complete)$/);if(m&&method==='POST')return m[2]==='request'?await ask(db,user,m[1]):m[2]==='cancel'?await cancelTrip(db,user,m[1]):await completeTrip(db,user,m[1]);
m=path.match(/^\/api\/requests\/([\w-]+)\/(decision|withdraw)$/);if(m&&method==='POST')return m[2]==='decision'?await decide(db,user,m[1],(await body(req)).status):await withdraw(db,user,m[1]);throw new Problem(404,'Ruta no encontrada.');
}catch(e){if(e instanceof Problem)return json({error:e.message},e.status);if(/UNIQUE constraint/.test(e.message))return json({error:'Ya existe esta solicitud. Actualiza para revisar su estado.'},409);console.error('EcoRuta request error',e.message);return json({error:'No se pudo completar la operación. Intenta nuevamente.'},500);}}};
