import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import {
    toWidget,
    viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
class AddMorePlugin extends Plugin {
    static get requires() {
        return [CodeBlock, Widget];
    }
    init() {
        const editor = this.editor;
        const {
            pluginFAQ,
            pluginContent,
            pluginRelated,
            pluginAdvantages,
            pluginButtonLink,
        } = editor.config._config;
        editor.ui.componentFactory.add("faqButton", (locale) => {
            const view = new ButtonView(locale);
            view.set({
                Text: "Hỏi đáp",
                label: "Hỏi đáp",
                tooltip: true,
                withText: true,
            });

            // Callback executed once the image is clicked.
            view.on("execute", pluginFAQ);

            return view;
        });
        editor.ui.componentFactory.add("contentButton", (locale) => {
            const view = new ButtonView(locale);
            view.set({
                Text: "Box nội dung",
                label: "Box nội dung",
                tooltip: true,
                withText: true,
            });

            // Callback executed once the image is clicked.
            view.on("execute", pluginContent);

            return view;
        });
        editor.ui.componentFactory.add("relatedButton", (locale) => {
            const view = new ButtonView(locale);
            view.set({
                Text: "Sản phẩm liên quan",
                label: "Sản phẩm liên quan",
                tooltip: true,
                withText: true,
            });

            // Callback executed once the image is clicked.
            view.on("execute", pluginRelated);

            return view;
        });
        editor.ui.componentFactory.add("advantagesButton", (locale) => {
            const view = new ButtonView(locale);
            view.set({
                Text: "Ưu/Khuyết điểm",
                label: "Ưu/Khuyết điểm",
                tooltip: true,
                withText: true,
            });

            // Callback executed once the image is clicked.
            view.on("execute", pluginAdvantages);

            return view;
        });
        editor.ui.componentFactory.add("chanhButtonLink", (locale) => {
            const view = new ButtonView(locale);
            view.set({
                Text: "Button Link",
                label: "Button Link",
                tooltip: true,
                withText: true,
            });

            // Callback executed once the image is clicked.
            view.on("execute", pluginButtonLink);

            return view;
        });
        this._defineSchema();
        this._defineConverters();
        // this._defineClipboardInputOutput();
        // but in the view it is a more complex structure.
        editor.editing.mapper.on(
          "viewToModelPosition",
          viewToModelPositionOutsideModelElement(
            this.editor.model,
            (viewElement) => viewElement.hasClass("lock-box")
          )
        );
    }
    _defineSchema() {
        this.editor.model.schema.register("lock-box", {
          allowWhere: "$text",
          allowIn: "$root",
          isInline: false,
          isBlock: true,
          allowAttributes: ["type", "content"],
        });
    }
    _defineConverters() {
        const conversion = this.editor.conversion;
        // Data-to-model conversion.
        conversion.for("upcast").elementToElement({
          view: {
            name: "pre",
            classes: ["lock-box"],
            contenteditable: false,
          },
          model: (viewElement, { writer }) => {
            return writer.createElement(
              "lock-box",
              getCardDataFromViewElement(viewElement)
            );
          },
        });

        // Model-to-data conversion.
        conversion.for("dataDowncast").elementToElement({
            model: "lock-box",
            view: (modelItem, { writer: viewWriter }) =>
                toWidget(createCardView(modelItem, viewWriter), viewWriter),
                converterPriority: "low",
        });

            // Model-to-view conversion.
        conversion.for("editingDowncast").elementToElement({
            model: "lock-box",
            view: (modelItem, { writer: viewWriter }) =>
                toWidget(createCardView(modelItem, viewWriter), viewWriter),
        });

        // Helper method for both downcast converters.
        function createCardView(modelItem, viewWriter) {
            const type = modelItem.getAttribute("type");
            const content = modelItem.getAttribute("content");

            const cardView = viewWriter.createContainerElement("pre", {
              class: "lock-box",
              id: `${type}-${new Date().getTime()}`,
              contenteditable: false,
            });
            viewWriter.insert(
              viewWriter.createPositionAt(cardView, "end"),
              viewWriter.createText(content)
            );

            return cardView;
        }
    }
}
function getCardDataFromViewElement(viewElement) {
    let idElement = viewElement.getAttribute("id");
    if (idElement) {
        idElement = idElement.split('-')[0]
    }
    return {
        content: getText(viewElement),
        type: idElement,
    };
}
function getText(viewElement) {
  return Array.from(viewElement.getChildren())
    .map((node) => (node.is("$text") ? node.data : ""))
    .join("");
}

export default AddMorePlugin;