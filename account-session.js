// Session tokens live only in this page's memory, never in backups, URLs or browser storage.
let session=null,timer;const required=new Set(),listeners=new Set();
const baseOf=config=>{try{return new URL(config.base).href.replace(/\/$/,'')}catch{return''}};
const notify=reason=>{for(const fn of listeners)fn(session,reason)};
export function requireAccount(base){required.add(baseOf({base}))}
export function isAccountService(config){return config?.mode==='service'&&required.has(baseOf(config))}
export function accountSession(){if(session&&session.expiresAt<=Date.now())clearAccountSession('expired');return session}
export function accountToken(config){const current=accountSession();return config?.mode==='service'&&current?.base===baseOf(config)?current.token:''}
export function setAccountSession(value){if(!/^ea_[A-Za-z0-9_-]{43}$/.test(value.token)||!Number.isFinite(value.expiresAt)||value.expiresAt<=Date.now())throw Error('登录响应无效，请重新登录。');clearTimeout(timer);session={...value,base:baseOf(value)};required.add(session.base);timer=setTimeout(()=>clearAccountSession('expired'),Math.min(value.expiresAt-Date.now(),2147483647));notify()}
export function clearAccountSession(reason='logout'){clearTimeout(timer);session=null;notify(reason)}
export function unauthorizedAccount(config,token){if(isAccountService(config)&&session?.token===token)clearAccountSession('unauthorized')}
export function onAccountSession(listener){listeners.add(listener);return()=>listeners.delete(listener)}

export function accountSessionSnapshot(){return session}
