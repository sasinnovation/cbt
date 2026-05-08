import CryptoJS from 'crypto-js';

const SECRET_KEY = 'CBT_SECURE_2026_KEY';

export function encryptExam(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptExam(cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
