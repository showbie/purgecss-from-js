import PurgeFromJS from './index';

describe('PurgeFromJS', () => {
    const mockContent = `const list = document.getElementsByTagName('p'kk'');
    list.length;
    list[0].style.color = \`red ${'list'} \`;
    const a = 'b';
    const tailwindClass = 'md:text-left';
    const EmberComponent = {
      classNameBindings: [
        'prop1:class-name',
        'prop2:yay:nay',
      ]
    };`;

    it('contains all the selectors', () => {
        const selectors = PurgeFromJS.extract(mockContent);
        const expected = [
            'list',
            'document',
            'getElementsByTagName',
            'p',
            'kk',
            'length',
            'style',
            'color',
            'red',
            'a',
            'b',
            'tailwindClass',
            'md:text-left',
            'md',
            'text-left',
            'EmberComponent',
            'classNameBindings',
            'prop1:class-name',
            'prop1',
            'class-name',
            "prop2:yay:nay",
            "prop2",
            'yay',
            'nay',
        ];
        expect(selectors).toEqual(expected);
    });
});
