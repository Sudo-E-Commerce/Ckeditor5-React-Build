import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

class AutoContent extends Plugin {
	init() {
        const editor = this.editor;
        const { dnvAutoContentWrite, dnvAutoContentRewrite, dnvAutoContentDescribe } = editor.config._config;
        editor.ui.componentFactory.add( 'auto_content_write', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Viết',
                label: 'Viết',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', dnvAutoContentWrite);

            return view;
        } );

        editor.ui.componentFactory.add( 'auto_content_rewrite', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Viết lại',
                label: 'Viết lại',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', dnvAutoContentRewrite);

            return view;
        } );
        
        editor.ui.componentFactory.add( 'auto_content_describe', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Mô tả',
                label: 'Mô tả',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', dnvAutoContentDescribe);

            return view;
        } );
	}
}

export default AutoContent;