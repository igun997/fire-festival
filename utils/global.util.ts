import crypto from 'crypto-js';
import { SIGNATURE_KEY } from '../constants/config.constant';

export const getUserToken = () => {
  return '';
};

// clear all local storage data and redirect to login page
export const clearLocalStorage = (isRedirect = false) => {
  localStorage.clear();
  if (isRedirect) {
    window.location.href = '/login';
  }
};
// encrypt password
export const encryptAes = (data: string) => {
  try {
    const chipper = crypto.AES.encrypt(
      data,
      crypto.enc.Hex.parse('AFd6N3v1ebLw711zxpZjxZ7iq4fYpNYa'),
      {
        mode: crypto.mode.CBC,
        iv: crypto.enc.Hex.parse('MesA7nqIVa23b167'),
        length: 286,
      },
    );
    return crypto.enc.Base64.stringify(
      crypto.enc.Utf8.parse(chipper.ciphertext.toString(crypto.enc.Hex)),
    );
  } catch (err) {
    console.log('error encryptAes', err);
  }
  return null;
};

//reformat number to currency IDR
export const formatCurrency = (value: number, currency_code: string | undefined | null = null) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency_code ?? 'IDR',
  }).format(value);
};

//add comma to number
export const addComma = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//currency code to symbol
export const currencyCodeToSymbol = (currency_code: string) => {
  switch (currency_code) {
    case 'IDR':
      return 'Rp';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'JPY':
      return '¥';
    case 'GBP':
      return '£';
    case 'CNY':
      return '¥';
    case 'KRW':
      return '₩';
    case 'THB':
      return '฿';
    case 'PHP':
      return '₱';
    case 'VND':
      return '₫';
    case 'MYR':
      return 'RM';
    case 'SGD':
      return 'S$';
    case 'AUD':
      return 'A$';
    case 'HKD':
      return 'HK$';
    case 'NZD':
      return 'NZ$';
    case 'CHF':
      return 'Fr';
    case 'SEK':
      return 'kr';
    case 'DKK':
      return 'kr';
    case 'NOK':
      return 'kr';
    case 'CAD':
      return 'C$';
    case 'MXN':
      return 'Mex$';
    case 'ZAR':
      return 'R';
    case 'TRY':
      return '₺';
    case 'RUB':
      return '₽';
    case 'INR':
      return '₹';
    case 'BRL':
      return 'R$';
    case 'PLN':
      return 'zł';
    case 'ILS':
      return '₪';
    case 'CLP':
      return '$';
    case 'COP':
      return '$';
    case 'PEN':
      return 'S/.';
    case 'BGN':
      return 'лв';
    case 'RON':
      return 'lei';
    case 'HUF':
      return 'Ft';
    default:
      return 'Rp';
  }
};

export const generateSignature = (
  path: string,
  method: string,
  token: any,
  body: any,
  timestamp: string,
) => {
  const bodyString = body !== '' && body !== null ? JSON.stringify(body).replace(/'/g, '"') : '';
  const _body = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(bodyString));
  const host = path.split('/')[2];
  let _path = path.replace(host, '');
  _path = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(_path));
  const createPayload = `path@${_path}|method@${method}|token@${token}|body@${_body}|timestamp@${timestamp}`;
  const trimmer = createPayload.trim().replace(' ', '');
  return crypto.HmacSHA256(trimmer, SIGNATURE_KEY ?? '').toString();
};

//base64 to blob url
export const base64ToBlob = (base64: string) => {
  const byteString = base64;
  const mimeString = byteString.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return URL.createObjectURL(blob);
};

//captialize first letter
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const pathToAsset = (path: string | undefined) => {
  if (path === undefined) {
    return null;
  }
  return `${process.env.NEXT_PUBLIC_ASSET_PREFIX}${path}`;
};
