import CryptoJS from 'crypto-js';

export function randomString(length: number): string {
  return CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);
}
