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
     * Guards a string value
     * @param {string} value value to be guarded
     */
    const guard = (value, name) => {
        if (value === null) {
            throw `${name} is null`;
        }

        if (value === undefined) {
            throw `${name} is undefined`;
        }

        if (typeof value !== 'string') {
            throw `${name} is not a string`;
        }
    };

    /**
     * Sets a value for a specifict key in the culture specified
     * @param {string} culture culture locale
     * @param {string} key key of the value
     * @param {string} value localized string
     */
    const setValueOf = (culture, key, value) => {
        guard(culture, 'culture');
        guard(key, 'key');
        guard(value, 'value');

        let cultureDoesNotExists = resources[culture] === undefined;

        if (cultureDoesNotExists) {
            // create new object inside resources object
            resources[culture] = {};
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
     * @param {string} culture culture to be used
     */
    const getValueOf = (key, culture) => {
        guard(key, 'key');

        if (arguments.length === 2) {
            guard(culture, 'culture');
        } else {
            culture = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
        }

        return resources[culture][key] || 'string not found';
    };

    /**
     * Gets all the resources
     * @param {string} culture culture to be used
     */
    const getValuesOf = (culture) => {
        if (arguments.length === 1) {
            guard(culture, 'culture');
        }

        return culture ? resources[culture] : resources;
    };

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