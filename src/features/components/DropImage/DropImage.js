import React from "react";

export const DropImage = props => {
    const handleDragEnter = e => {
      e.preventDefault();
      e.stopPropagation();
      //console.log(e.dataTranser.files[0]);
    };
    const handleDragLeave = e => {
      e.preventDefault();
      e.stopPropagation();
      //console.log(e.dataTranser.files[0]);
    };
    const handleDragOver = e => {
      e.preventDefault();
      e.stopPropagation();
      //console.log(e.dataTranser.files[0]);
    };
    const handleDrop = e => {
      e.preventDefault();
      console.log(e.dataTransfer.files);
    };
    return (
      <div className={'drag-drop-zone'}
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
        draggable={true}
      >
        <p>Drag files here to upload</p>
      </div>
    );
  };
