class BitI18N {
  constructor() {
    this.browserCulture = navigator.languages
      ? navigator.languages[0]
      : navigator.language || navigator.userLanguage;
    this.resources = {};
  }

  guard(value, name) {
    if (value === null) {
      throw `${name} is null`;
    }

    if (value === undefined) {
      throw `${name} is undefined`;
    }

    if (typeof value !== "string") {
      throw `${name} is not a string`;
    }
  }

  set(culture, key, value) {
    this.guard(culture, "culture");
    this.guard(key, "key");
    this.guard(value, "value");

    let cultureDoesNotExists = this.resources[culture] === undefined;

    if (cultureDoesNotExists) {
      this.resources[culture] = {};
    }

    this.resources[culture][key] = value;
  }

  setMany(resources) {
    let cultures = Object.keys(resources);

    cultures.forEach(culture => {
      let keys = Object.keys(resources[culture]);

      keys.forEach(key => {
        let value = resources[culture][key];

        this.set(culture, key, value);
      });
    });
  }

  get(key, culture = this.browserCulture) {
    this.guard(key, "key");
    this.guard(culture, "culture");

    return this.resources[culture]
      ? this.resources[culture][key] || "string not found"
      : "culture not found";
  }

  getAll(culture) {
    if (culture) {
      this.guard(culture, "culture");
      return this.resources[culture];
    }

    return this.resources;
  }
}
