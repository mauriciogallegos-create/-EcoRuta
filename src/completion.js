import {json,demand,body,stmt,text,role,uid,now,projection} from './common.js';
export async function completeTrip(db,user,id){role(user,'driver');let r=await stmt(db,"UPDATE trips SET status='completed' WHERE id=? AND driver_id=? AND status='open' AND departure<=? RETURNING id",id,user.id,now()).first();demand(r,409,'Solo puedes finalizar tu viaje después de la salida.');return json({ok:true});}
