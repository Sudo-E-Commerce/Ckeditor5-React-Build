import imageIcon from './images_url.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { Plugin } from "@ckeditor/ckeditor5-core";

class InsertImage extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Chèn ảnh từ đường dẫn',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const imageUrl = prompt( 'Dán đường dẫn hình ảnh cần chèn vào đây' );

                editor.model.change( writer => {
                    if(imageUrl != '' && imageUrl != undefined) {
                        const imageElement = writer.createElement( 'imageBlock', {
                            src: imageUrl
                        } );

                        // Insert the image in the current selection location.
                        editor.model.insertContent( imageElement, editor.model.document.selection );
                    }
                } );
            } );

            return view;
        } );
    }
}


export default InsertImage;