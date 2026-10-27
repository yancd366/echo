import {aiBase} from './intelligence.js';
const TOKEN='echo-ai-secret',DEST='echo-ai-destination';
export function credentialDestination(config){return config.mode+'|'+aiBase(config)}
export function readCredential(config,stores=[sessionStorage,localStorage]){let destination;try{destination=credentialDestination(config)}catch{return''}for(const store of stores){try{const token=store.getItem(TOKEN),bound=store.getItem(DEST);if(token&&bound===destination)return token}catch{}}return''}
export function forgetCredentials(stores=[sessionStorage,localStorage]){for(const store of stores){store.removeItem(TOKEN);store.removeItem(DEST)}}
export function saveCredential(config,token,{remember=false,stores=[sessionStorage,localStorage]}={}){const destination=credentialDestination(config);forgetCredentials(stores);stores[0].setItem(DEST,destination);stores[0].setItem(TOKEN,token);if(remember){stores[1].setItem(DEST,destination);stores[1].setItem(TOKEN,token)}}
