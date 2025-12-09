import type { PersistStorage, StorageValue } from 'zustand/middleware';

export function createCookieStorage<T>(): PersistStorage<T> {
  return {
    getItem: (name: string): StorageValue<T> | null => {
      if (typeof window === 'undefined') return null;

      const item = localStorage.getItem(name);
      if (!item) return null;

      document.cookie = `${name}=${encodeURIComponent(
        item
      )}; path=/; max-age=2592000; SameSite=Lax`;

      try {
        return JSON.parse(item) as StorageValue<T>;
      } catch {
        return null;
      }
    },

    setItem: (name: string, value: StorageValue<T>): void => {
      if (typeof window === 'undefined') return;

      const stringValue = JSON.stringify(value);

      localStorage.setItem(name, stringValue);

      document.cookie = `${name}=${encodeURIComponent(
        stringValue
      )}; path=/; max-age=2592000; SameSite=Lax`;
    },

    removeItem: (name: string): void => {
      if (typeof window === 'undefined') return;

      localStorage.removeItem(name);

      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    },
  };
}
