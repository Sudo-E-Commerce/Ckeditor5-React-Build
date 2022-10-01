import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import swal from "sweetalert2";
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
        editor.ui.componentFactory.add( 'chanhLink', locale => {
            const view = new ButtonView( locale );
            view.set( {
                Text: 'Button Link',
                label: 'Button Link',
                tooltip: true,
                withText: true
            } );
            view.on( 'execute', () => {
                new swal( {
                    title: 'Nhập button link',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Thêm mới",
                    cancelButtonText: "Đóng",
                    closeOnCancel: false,
                    html:
                    '<input id="namechanhLink" class="swal2-input" placeholder="Tiêu đề button">' +
                    '<input id="hrefchanhLink" class="swal2-input" placeholder="Link">',
                    preConfirm: () => {
                        if (document.getElementById('namechanhLink').value && document.getElementById('hrefchanhLink').value) {
                            return {
                                name: document.getElementById('namechanhLink').value.trim(),
                                link: document.getElementById('hrefchanhLink').value.trim()
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

export default AddMorePlugin;