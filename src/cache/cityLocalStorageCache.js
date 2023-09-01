import { CACHE_EXPIRATION, CACHE_KEY_PREFIX } from "../constants";

export const setLocalStorageCache = (key, value) => {
  const data = {
    value,
    expiresAt: Date.now() + CACHE_EXPIRATION,
  };
  localStorage.setItem(CACHE_KEY_PREFIX+key, JSON.stringify(data));
};

export const getLocalStorageCache = (key) => {
  const data = localStorage.getItem(CACHE_KEY_PREFIX+key);
  if (data) {
    const parsedData = JSON.parse(data);
    if (parsedData.expiresAt > Date.now()) {
      return parsedData.value;
    } else {
      localStorage.removeItem(key); // Clear expired data
    }
  }
  return null;
};