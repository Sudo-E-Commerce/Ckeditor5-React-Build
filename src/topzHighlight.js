import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

class TopzHighlight extends Plugin {
	init() {
        const editor = this.editor;
        const { dnvHighLight } = editor.config._config;
        editor.ui.componentFactory.add( 'topzHighlight', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Vùng nổi bật',
                label: 'Vùng nổi bật',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', dnvHighLight);

            return view;
        } );
	}
}

export default TopzHighlight;