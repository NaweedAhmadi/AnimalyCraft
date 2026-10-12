import crypto from 'node:crypto';
export function setSessionCookie(res,id){const name=process.env.SESSION_COOKIE||'animaly_session';res.cookie(name,id,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:31536000000});}
export function sessionCookie(req,res,next){
  const name=process.env.SESSION_COOKIE||'animaly_session'; let id=req.cookies[name];
  if(!id){id=crypto.randomUUID();setSessionCookie(res,id);}
  req.sessionId=id;next();
}
