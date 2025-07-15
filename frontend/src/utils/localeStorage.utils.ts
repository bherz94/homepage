export class LocaleStorageUtils {
  static safeToStorage<T>(key: string, object: T): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  static getFromStorage<T>(key: string): T | null {
    const entry = localStorage.getItem(key);
    return entry ? (JSON.parse(entry) as T) : null;
  }
}
