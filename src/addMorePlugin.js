import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

class AddMorePlugin extends Plugin {
	init() {
        const editor = this.editor;
        const { pluginFAQ,  pluginGallery, pluginContent, pluginRelated, pluginAdvantages} = editor.config._config;
        editor.ui.componentFactory.add( 'faqButton', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Hỏi đáp',
                label: 'Hỏi đáp',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', pluginFAQ);

            return view;
        });
        editor.ui.componentFactory.add( 'galleryButton', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Gallery ảnh',
                label: 'Gallery ảnh',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', pluginGallery);

            return view;
        });
        editor.ui.componentFactory.add( 'contentButton', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Box nội dung',
                label: 'Box nội dung',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', pluginContent);

            return view;
        });
        editor.ui.componentFactory.add( 'relatedButton', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Sản phẩm liên quan',
                label: 'Sản phẩm liên quan',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', pluginRelated);

            return view;
        });
        editor.ui.componentFactory.add( 'advantagesButton', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Ưu/Khuyết điểm',
                label: 'Ưu/Khuyết điểm',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', pluginAdvantages);

            return view;
        });
	}
}

export default AddMorePlugin;