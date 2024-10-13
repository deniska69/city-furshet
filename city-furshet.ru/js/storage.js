const TEST_KEY = "$nJD<dgn2";

class Storage {
  constructor() {
    this.supported = undefined;
  }
  get(key) {
    if (!this.isSupported) return null;
    return JSON.parse(localStorage.getItem(key.toString()));
  }

  set(key, value) {
    if (!this.isSupported) return null;
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }

  isSupported() {
    if (this.supported !== undefined) return supported;

    try {
      localStorage.setItem(TEST_KEY, TEST_KEY);
      localStorage.getItem(TEST_KEY);

      this.supported = true;
    } catch (e) {
      this.supported = false;
    }

    return this.supported;
  }
}

export const storage = new Storage();
