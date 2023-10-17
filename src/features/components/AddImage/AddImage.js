import { PlusIcon } from "../../../vectors/PlusIcon";
import { CloseIcon } from "../../../vectors/CloseIcon/closeIcon";
import styles from "./AddImage.module.css";
import { useEffect, useState, useRef } from "react";

export const AddImage = (props) => {
  function createImageBlob() {
    if (props.image) {
      return URL.createObjectURL(props.image);
    }
    return "";
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("case 1");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("case 2");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("case 3");
  };
  const handleDrop = (e) => {
    console.log("case 4");
    e.preventDefault();
    if (props.enabled) {
      props.setImage(e.dataTransfer.files[0]);
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    //console.log(props.image);
    props.onRerender();
  });

  return (
    <>
      <div className="relative w-1/5">
        {props.image && (
          <CloseIcon
            onClick={() => {
              console.log(inputRef.current.value);
              inputRef.current.value = null;
              props.removeImage();
            }}
            className={styles.closeButton}
          />
        )}
        <div
          className={`bg-gray-100 ${styles.container} rounded-2xl shadow relative overflow-hidden`}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          draggable={false}
        >
          {!props.image ? (
            <label
              className={`w-full h-full block center-children-x-y ${
                props.enabled ? "cursor-pointer" : ""
              }`}
              for={props.uniqueID}
            >
              <PlusIcon enabled={props.enabled} />
            </label>
          ) : (
            <>
              <img
                draggable="false"
                className={`${styles.uploadedItemimg} w-full h-full`}
                src={createImageBlob()}
                alt="item preview"
              />
            </>
          )}
          <input
          ref={inputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                props.setImage(e.target.files[0]);
              }
            }}
            disabled={!props.enabled}
            className="hidden"
            type="file"
            accept="image/png, image/jpeg"
            id={props.uniqueID}
          />
        </div>{" "}
      </div>
    </>
  );
};
