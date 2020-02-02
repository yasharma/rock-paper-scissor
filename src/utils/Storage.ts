export default class Storage {
  static get<T = object>(key = "rpc_storage"): T | undefined {
    if (!localStorage) return;
    try {
      const item = localStorage.getItem(key);
      if(item === null) return;
      return JSON.parse(item);
    } catch (error) {
      throw new Error('store deserialization failed');
    }
  }

  static set<T = object>(session: T, key = "rpc_storage"): void {
    if (!localStorage) return;
    try {
      return localStorage.setItem(key, JSON.stringify(session));
    } catch (error) {
      throw new Error('store serialization failed');
    }
  }

  static clear(key: string): void {
    if (!localStorage) return;
    try {
      return localStorage.removeItem(key);
    } catch (error) {
      throw new Error('store deletion failed');
    }
  }
  
  static clearAll(): void {
    if (!localStorage) return;
    try {
      return localStorage.clear();
    } catch (error) {
      throw new Error('store deletion failed');
    }
  }
}
