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
      pluginPost,
      pluginCategory,
      aiAutoContentWrite,
      aiAutoContentRewrite,
      aiAutoContentDescribe,
      aiBanner,
    } = editor.config._config;

    editor.ui.componentFactory.add("plugin_post", (locale) => {
      const view = new ButtonView(locale);
      view.set({
        Text: "Post Shortcode",
        label: "Post Shortcode",
        tooltip: true,
        withText: true,
      });

      // Callback executed once the image is clicked.
      view.on("execute", pluginPost);

      return view;
    });
    
    editor.ui.componentFactory.add("plugin_category", (locale) => {
        const view = new ButtonView(locale);
        view.set({
            Text: "Post Category",
            label: "Post Category",
            tooltip: true,
            withText: true,
        });

        // Callback executed once the image is clicked.
        view.on("execute", pluginCategory);

        return view;
    });

    editor.ui.componentFactory.add("auto_content_write", (locale) => {
        const view = new ButtonView(locale);
        view.set({
            Text: "Viết thêm",
            label: "Viết thêm",
            tooltip: true,
            withText: true,
        });

        // Callback executed once the image is clicked.
        view.on("execute", aiAutoContentWrite);

        return view;
    });

    editor.ui.componentFactory.add("auto_content_rewrite", (locale) => {
        const view = new ButtonView(locale);
        view.set({
            Text: "Viết lại",
            label: "Viết lại",
            tooltip: true,
            withText: true,
        });

        // Callback executed once the image is clicked.
        view.on("execute", aiAutoContentRewrite);

        return view;
    });

    editor.ui.componentFactory.add("auto_content_describe", (locale) => {
        const view = new ButtonView(locale);
        view.set({
            Text: "Mô tả",
            label: "Mô tả",
            tooltip: true,
            withText: true,
        });

        // Callback executed once the image is clicked.
        view.on("execute", aiAutoContentDescribe);

        return view;
    });
    editor.ui.componentFactory.add("ai_banner", (locale) => {
        const view = new ButtonView(locale);
        view.set({
            Text: "Banner Ads",
            label: "Banner Ads",
            tooltip: true,
            withText: true,
        });

        // Callback executed once the image is clicked.
        view.on("execute", aiBanner);

        return view;
    });
    // schema
    this._defineSchema();
    this._defineConverters();
    // this._defineClipboardInputOutput();
    // but in the view it is a more complex structure.
    editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass("lock-box")
      )
    );
  }
  _defineSchema() {
    this.editor.model.schema.register("lock-box", {
      allowWhere: "$text",
      allowIn: "$root",
      isInline: false,
      isBlock: true,
      allowAttributes: ["type", "content", "id"],
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
      const id = modelItem.getAttribute("id");

      const cardView = viewWriter.createContainerElement("pre", {
        class: "lock-box",
        id: id,
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
  let type = null;
  if (idElement) {
    type = idElement.split("-")[0];
  }
  return {
    content: getText(viewElement),
    type: type,
    id: idElement,
  };
}
function getText(viewElement) {
  return Array.from(viewElement.getChildren())
    .map((node) => (node.is("$text") ? node.data : ""))
    .join("");
}

export default AddMorePlugin;
