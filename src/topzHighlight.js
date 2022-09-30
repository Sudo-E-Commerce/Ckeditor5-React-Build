import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import swal from 'sweetalert2';

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
        editor.ui.componentFactory.add( 'topzLink', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Button Link',
                label: 'Button Link',
                tooltip: true,
                withText: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                new swal( {
                    title: 'Nhập button link',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Thêm mới",
                    cancelButtonText: "Đóng",
                    closeOnCancel: false,
                    html:
                    '<input id="nametopzLink" class="swal2-input" placeholder="Tiêu đề button">' +
                    '<input id="hreftopzLink" class="swal2-input" placeholder="Link">',
                    preConfirm: () => {
                        if (document.getElementById('nametopzLink').value && document.getElementById('hreftopzLink').value) {
                            return {
                                name: document.getElementById('nametopzLink').value,
                                link: document.getElementById('hreftopzLink').value
                            }
                        } else {
                            new swal.showValidationMessage('Tiêu đề và link là bắt buộc!')   
                        }
                    }
                } )
                .then ( result => {
                    if(result.value && result.value.name && result.value.link){
                        editor.model.change( writer => {
                            let text = `[link titlelink="${result.value.name}" linkweb="${result.value.link}"]`;
                            const txt = writer.createText(text);

                            editor.model.insertContent( txt, editor.model.document.selection );
                        });
                    }
                } )
            });

            return view;
        } );
	}
}

export default TopzHighlight;