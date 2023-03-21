class StorageHelper {
  static get(key) {
    const data = window.localStorage.getItem(key);

    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  static async set(key, data) {
    data = typeof data === 'string' ? data : JSON.stringify(data);
    window.localStorage.removeItem(key);

    window.localStorage.setItem(key, data);
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }
}

export default StorageHelper;
