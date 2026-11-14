export class Problem extends Error { constructor(status,message){super(message);this.status=status;} }
export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
export const demand=(ok,status,message)=>{if(!ok)throw new Problem(status,message)};
export const text=(value,min,max,label)=>{demand(typeof value==='string',400,`${label}: escribe un texto.`);let v=value.trim();demand(v.length>=min&&v.length<=max,400,`${label}: usa entre ${min} y ${max} caracteres.`);return v;};
export async function body(req){demand(Number(req.headers.get('content-length')||0)<12000,413,'Contenido demasiado grande.');let raw=await req.text();demand(raw.length<12000,413,'Contenido demasiado grande.');try{return JSON.parse(raw)}catch{throw new Problem(400,'Datos JSON inválidos.')}}
export const stmt=(db,sql,...args)=>db.prepare(sql).bind(...args);
export async function sha(value){let a=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return [...new Uint8Array(a)].map(n=>n.toString(16).padStart(2,'0')).join('');}
export const uid=()=>crypto.randomUUID();
export const role=(user,r)=>demand(user.role===r,403,r==='driver'?'Esta acción requiere un conductor.':'Esta acción requiere un pasajero.');
export const now=()=>new Date().toISOString();

export const projection=`SELECT t.*,u.name driver_name,(SELECT COUNT(*) FROM requests r WHERE r.trip_id=t.id AND r.status='accepted') accepted_count FROM trips t JOIN users u ON u.id=t.driver_id`;
