export class LocalStorageHelper {
  static setItem(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
  }

  static getItem(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  static removeItem(name) {
    window.localStorage.removeItem(name);
  }
}
