import {accountToken,isAccountService} from './account-session.js';
import {aiBase} from './intelligence.js';
const TOKEN='echo-ai-secret',DEST='echo-ai-destination';
export function credentialDestination(config){return config.mode+'|'+aiBase(config)}
export function readCredential(config,stores=[sessionStorage,localStorage]){if(isAccountService(config))return accountToken(config);let destination;try{destination=credentialDestination(config)}catch{return''}for(const store of stores){try{const token=store.getItem(TOKEN),bound=store.getItem(DEST);if(token&&bound===destination)return token}catch{}}return''}
export function forgetCredentials(stores=[sessionStorage,localStorage]){for(const store of stores){store.removeItem(TOKEN);store.removeItem(DEST)}}
export function saveCredential(config,token,{remember=false,stores=[sessionStorage,localStorage]}={}){if(isAccountService(config))throw Error('这个 Echo 服务已改为账号登录，无需填写连接码。');const destination=credentialDestination(config);forgetCredentials(stores);stores[0].setItem(DEST,destination);stores[0].setItem(TOKEN,token);if(remember){stores[1].setItem(DEST,destination);stores[1].setItem(TOKEN,token)}}
