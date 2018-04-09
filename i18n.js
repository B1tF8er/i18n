/**
 * Small module to allow internationalization
 */
var bitI18N = bitI18N || (function bitI18NModule() {
    'use strict';
    /**
     * Collection of cultures which each has another collection of key value pairs
     */
    let resources = {};

    /**
     * Sets a value for a specifict key in the culture specified
     * @param {string} culture culture locale
     * @param {string} key key of the value
     * @param {string} value localized string
     */
    const setValueOf = (culture, key, value) => {
        let cultureDoesNotExists = resources[culture] === undefined;

        if (cultureDoesNotExists) {
            // create new key inside resources object
            resources[culture] = {
                name: ''
            };
        }

        resources[culture][key] = value;
    };

    /**
     * Sets a collection of one and/or multiple cultures with their own set of key value pairs
     * @param {Object} resources collection of resources
     */
    const setValuesOf = (resources) => {
        let cultures = Object.keys(resources);

        cultures.forEach(culture => {
            let keys = Object.keys(resources[culture]);

            keys.forEach(key => {
                let value = resources[culture][key];

                setValueOf(culture, key, value);
            });
        });
    };

    /**
     * Gets a value by key and the current browser culture
     * @param {string} key key of the value
     */
    const getValueOf = (key) => {
        let culture = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
        let value = null;
        let cultureHyphenIndex = culture.indexOf('-');
        let cultureHasHyphen = cultureHyphenIndex !== -1;

        culture = cultureHasHyphen ? culture.substring(0, cultureHyphenIndex) : culture;

        value = resources[culture][key];

        return value || 'string not found';
    };

    /**
     * Gets all the resources
     */
    const getValuesOf = () => resources;

    /**
     * Set of functionality exposed as public members of the module
     */
    const API = {
        set: setValueOf,
        setMany: setValuesOf,
        get: getValueOf,
        getAll: getValuesOf
    };
    return API;
})();