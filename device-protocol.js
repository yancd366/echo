export const REMEMBER_DAYS=30;
export const DEVICE_PROOF_VERSION='echo-device-login/v1';
export function deviceProofMessage(c){return JSON.stringify({purpose:DEVICE_PROOF_VERSION,audience:c.audience,deviceId:c.deviceId,challengeId:c.challengeId,nonce:c.nonce,expiresAt:c.expiresAt})}
