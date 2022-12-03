import React, { useEffect, useState } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import fileApi from "@api/fileApi";
interface iEditorProps extends React.HTMLProps<HTMLDivElement> {
  setValue: (a: string) => void;
  valueHTML: string;
}

const EditorText: React.FC<iEditorProps> = (props) => {
  const { setValue, valueHTML } = props;
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(valueHTML).contentBlocks) ||
        EditorState.createEmpty()
    )
  );
  // useEffect(() => {
  //   let temp = document.createElement("div");
  //   temp.innerHTML = valueHTML;
  //   temp.querySelectorAll("img").forEach((item) => {
  //     item.style.display = "flex";
  //     item.style.alignSelf = "center";
  //     if (item.offsetHeight > 620) item.style.width = "50%";
  //     console.log(item);
  //   });
  //   temp.querySelectorAll("h1").forEach((item) => {
  //     item.id = item.innerText.toString().formatH1().toString();
  //   });
  //   setValue(temp.innerHTML);
  // }, [valueHTML]);
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

          let temp = document.createElement("div");
          temp.innerHTML = a;
          temp.querySelectorAll("img").forEach((item) => {
            item.style.marginLeft = "auto";
            item.style.marginRight = "auto";
            item.style.alignSelf = "center";
            console.log("-----------------------------");
            console.log(item.height);
            console.log(item.width);
            console.log(item.offsetHeight);
            console.log(item.offsetTop);
            console.log(item.offsetWidth);

            if (item.height > 620) {
              item.style.width = "50%";
              console.log(item);
            }
            console.log("-----------------------------");
          });
          temp.querySelectorAll("h1").forEach((item, key) => {
            item.id = key + item.innerText.toString().formatH1().toString();
          });
          console.log(temp.innerHTML);

          setValue(temp.innerHTML);
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
          alignmentEnabled: false,

          previewImage: true,
          inputAccept: "image/jpeg,image/jpg,image/png",
          uploadCallback: async (file: File) => {
            // console.log(file);
            // console.log(typeof file);
            const result = await fileApi.updateImage(file);
            if (result.status === 201) {
            }
            var reader = new FileReader();
            console.log(reader.readAsDataURL(file));

            // const imageObject = {
            //   file: file,
            //   localSrc: URL.createObjectURL(file),
            // };
            // console.log(file);

            return new Promise((resolve, reject) => {
              resolve({
                data: {
                  link: `${process.env.REACT_APP_API_URL}file/${result.data.id}`,
                },
              });
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
            height: "480px",
            width: "100%",
          },
        },
      }}
    />
  );
};

export default EditorText;
