import * as esprima from 'esprima';

export default class PurgeFromJS {
    static extract(content) {
        const tokens = esprima.tokenize(content);
        let selectors = tokens
            .filter(token => {
                return (
                    token.type === 'Identifier' ||
                    token.type === 'Template' ||
                    token.type === 'String'
                );
            })
            .reduce((acc, token) => {
                if (token.type === 'String') {
                    // cut single/double quotes from the string
                    // because esprima wraps string to a string
                    const unwrappedString = token.value.slice(
                        1,
                        token.value.length - 1
                    );

                    // this covers Ember's legacy classNameBindings micro-syntax
                    if (unwrappedString.includes(':')) {
                      // include full string as well as each chunk between colons
                      return acc.concat(unwrappedString.split(' ')).concat(unwrappedString.split(':'));
                    }

                    return acc.concat(unwrappedString.split(' ')); // in case if string contains a list of classes
                } else if (token.type === 'Template') {
                    // cut backticks from the template
                    const len = token.value.length;
                    const isOpenedTemplate = token.value[0] === '`';
                    const isClosedTemplate = token.value[len - 1] === '`';
                    const unwrappedTemplate = token.value.slice(
                        isOpenedTemplate ? 1 : 0,
                        isClosedTemplate ? len - 1 : len
                    );
                    return acc.concat(unwrappedTemplate.split(' '));
                }
                return acc.concat(token.value);
            }, []);

        // clear selectors from empty strings
        selectors = selectors.filter(selector => selector !== '');
        return [...new Set(selectors)]; // remove duplicates
    }
}
