import * as CryptoJS from "crypto-js";

// This is only for privatekey
export const encryptAnyWithAES = (text: string, passphrase: string): string => {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
// This is only for privatekey
export const decryptAnyWithAES = (ciphertext: string, passphrase: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
