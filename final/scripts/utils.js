export function getStoredValue(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read ${key} from localStorage`, error);
    return null;
  }
}

export function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Unable to save ${key} to localStorage`, error);
  }
}

export function getStoredObject(key, fallback = {}) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Unable to parse ${key} from localStorage`, error);
    return fallback;
  }
}

export function setStoredObject(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to save ${key} to localStorage`, error);
  }
}
