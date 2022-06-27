import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";


class TableOfContent extends Plugin {
	init() {
        
		const editor = this.editor;
        const { dnvCKToc } = editor.config._config;
        editor.ui.componentFactory.add( 'tableOfContent', locale => {
            const view = new ButtonView( locale );

            view.set( {
                Text: 'Mục lục', 
                label: 'Mục lục', 
                withText: true,
                tooltip: true
            } );

            view.on( 'execute', dnvCKToc);

            return view;
        } );
		
	}
}
export default TableOfContent;