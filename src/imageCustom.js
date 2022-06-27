import { Plugin } from "@ckeditor/ckeditor5-core";

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import { ButtonView } from "@ckeditor/ckeditor5-ui";

class ImageCustom extends Plugin {
	init() {
        const editor = this.editor;
        const { dnvImage } = editor.config._config;
        editor.ui.componentFactory.add( 'imageCustom', locale => {
            const view = new ButtonView( locale );
            view.set( {
                label: 'Hình ảnh',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', dnvImage);

            return view;
        } );
	}
}

export default ImageCustom;