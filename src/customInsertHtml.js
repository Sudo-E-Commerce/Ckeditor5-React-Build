import { Plugin } from "@ckeditor/ckeditor5-core";

export default class Div extends Plugin {
    init() {
        const editor = this.editor;

        editor.model.schema.register('div', {
            inheritAllFrom: '$root',
            allowAttributes: ['id', 'class', 'style', 'data-name', 'data-stt', 'data-price', 'data-value'],
            allowWhere: '$block',
            allowContentOf: '$root',
            allowIn: '$root',
            allowChildren: '$root'
        });

        editor.conversion.elementToElement({model: 'div', view: 'div'});
        editor.conversion.attributeToAttribute({model: 'class', view: 'class'});
        editor.conversion.attributeToAttribute({model: {name: 'div', key: 'id'}, view: 'id'});
        editor.conversion.attributeToAttribute({model: {name: 'div', key: 'style'}, view: 'style'});
        editor.conversion.attributeToAttribute({model: {name: 'div', key: 'data-name'}, view: 'data-name'});
        editor.conversion.attributeToAttribute({model: {name: 'div', key: 'data-stt'}, view: 'data-stt'});
        editor.conversion.attributeToAttribute({model: {name: 'div', key: 'data-price'}, view: 'data-price'});
        editor.conversion.attributeToAttribute({model: {name: 'div', key: 'data-value'}, view: 'data-value'});

    }
}