import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";

class BestOffer extends Plugin {
	init() {
        const editor = this.editor;
        const { dnvBestOffer } = editor.config._config;
        editor.ui.componentFactory.add( 'bestOffer', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Ưu đãi tốt nhất',
                label: 'Ưu đãi tốt nhất',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', dnvBestOffer);

            return view;
        } );
	}
}

export default BestOffer;