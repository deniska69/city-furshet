const TEST_KEY = "$nJD<dgn2";

export default class Storage {
  constructor() {
    this.supported = undefined;
  }

  isSupported() {
    if (this.supported !== undefined) return this.supported;

    try {
      localStorage.setItem(TEST_KEY, TEST_KEY);
      localStorage.getItem(TEST_KEY);

      this.supported = true;
    } catch (e) {
      this.supported = false;
    }

    return this.supported;
  }

  get(key) {
    if (!this.isSupported) return null;
    return JSON.parse(localStorage.getItem(key.toString()));
  }

  set(key, value) {
    if (!this.isSupported) return null;
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }
}
