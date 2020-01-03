## purgecss extractor for js files

Same as https://github.com/FullHuman/purgecss-from-js but with naïve support for Ember's [classNameBindings](https://api.emberjs.com/ember/3.15/classes/Component/properties/classNameBindings?anchor=classNameBindings) micro-syntax.

For example:

The classname binding `classNameBindings: 'prop1:foo-bar'` will whitelist three strings for purgecss: `prop1:foo-bar`, `prop1`, `foo-bar`.

Similarly, `classNameBindings: 'prop2:yay:nay'` will whitelist `prop2:yay:nay`, `prop2`, `yay`, `nay`.

Note that this does not support the dasherization that classNameBindings does by default:

`classNameBindings: ['isUrgent'],` will whitelist `isUrgent`, **but not** `is-urgent`.

## Development

```sh
npm test
```

## Deployment

```sh
npm run-script build
```
