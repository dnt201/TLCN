import React, { useState } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
interface iEditorProps extends React.HTMLProps<HTMLDivElement> {
  setValue: (a: string) => void;
  valueHTML: string;
}

const EditorText: React.FC<iEditorProps> = (props) => {
  const { setValue, valueHTML } = props;
  const [uploadImage, setUploadImage] = useState();
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(valueHTML).contentBlocks)
    )
  );
  return (
    <Editor
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      editorState={editorState}
      onEditorStateChange={(newState) => {
        setEditorState(newState);
        if (setValue) {
          var selectionState = newState.getSelection();
          var anchorKey = selectionState.getAnchorKey();
          var currentContent = newState.getCurrentContent();

          let a = draftToHtml(convertToRaw(newState.getCurrentContent()));
          const temp = document.createElement("div");
          temp.innerHTML = a;
          temp
            .querySelectorAll("h1")
            .forEach((item) => (item.id = item.innerText));
          setValue(draftToHtml(convertToRaw(newState.getCurrentContent())));
        }
      }}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "list",
          "textAlign",
          "embedded",
          "link",
          "emoji",
          "image",
          "history",
        ],
        inline: {
          inDropdown: true,
          options: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "monospace",
            "superscript",
            "subscript",
          ],
        },
        blockType: { inDropdown: true },
        list: { inDropdown: true },
        link: { inDropdown: true },

        image: {
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          previewImage: true,
          inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
          uploadCallback: (file: File) => {
            console.log(file);
            console.log(typeof file);

            var reader = new FileReader();
            console.log(reader.readAsDataURL(file));

            const imageObject = {
              file: file,
              localSrc: URL.createObjectURL(file),
            };
            // console.log(file);
            return new Promise((resolve, reject) => {
              resolve({ data: { link: "imageObject.localSrc " } });
            });
          },
          defaultSize: {
            height: "auto",
            width: "auto",
          },
        },
        embedded: {
          embedCallback: (embeddedLink: any) => {
            if (embeddedLink.indexOf("youtube.com" || "youtu.be/") >= 0) {
              embeddedLink = embeddedLink.replace("watch?v=", "embed/");
              embeddedLink = embeddedLink.replace("/watch/", "/embed/");
              embeddedLink = embeddedLink.replace(
                "youtu.be/",
                "youtube.com/embed/"
              );
              embeddedLink = embeddedLink.replace("&ab_channel=", "/");

              return embeddedLink;
            }
          },
          defaultSize: {
            height: "auto",
            width: "100%",
          },
        },
      }}
    />
  );
};

export default EditorText;
