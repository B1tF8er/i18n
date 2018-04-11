# Bit.I18N
Small internationalization module to localize strings in JaavaScript

# Usage
Download or clone the repo to get the i18n.js file, add it to your project and create a reference to it your bundles or pages. 

## Important
the values are case sensitive __**t**est__ is not the same as __**T**est__

# Examples
### getAll
Takes as optional argument the culture, if no argument is passed it returns all the resources

Throws an exception if the argument is not a string

Returns the collection of resources as a collection of Cultures which each has a collection of key value pairs with the localized strings
```javascript
bitI18N.getAll();
bitI18N.getAll('es');
bitI18N.getAll('es-MX');
```
### get
Takes as arguments:

  1. the key of the value to be found
  2. the culture of the value to be found __(OPTIONAL)__, If the culture is not passed as argument, it will take the default browser culture

Throws an exception if:

  1. the argument key is not a string, is null or undefined
  2. the argument culture is not a string, is null or undefined

Returns a localized string if found in the culture, string not found otherwise
```javascript
bitI18N.get('test'); // uses default browser culture
bitI18N.get('test', 'es');
bitI18N.get('test', 'es-MX');
```
### setMany
Takes as arguments:

  1. a resources dictionaty
 
Throws an exception if:

  1. the value of any key is not a string, is null or undefined

```javascript
bitI18N.setMany({
    es: {
        'Test': 'prueba'
    },
    en: {
        'Test': 'test'
    }
});
```
### set
Takes as arguments:

  1. the culture of a localized resource
  2. the key of a localized resource
  3. the value of a localized resource

Throws an exception if:
  
  1. the argument culture is not a string, is null or undefined
  2. the argument key is not a string, is null or undefined
  3. the argument value is not a string, is null or undefined 

```javascript
bitI18N.set('es', 'test', 'Prueba');
bitI18N.set('en', 'test', 'Test');
```
