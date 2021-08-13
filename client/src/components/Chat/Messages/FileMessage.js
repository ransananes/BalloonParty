import React from 'react';
import FileIcon from './../icons/FileIcon';


const FileMessage = (props) => {
  let image_type = false;
  if (props.data.type === "image/png") image_type = true;
  return (
    <a className="sc-message--file" href={props.data.url} download={props.data.fileName}>
      {image_type ? <span> <FileIcon /> <p>{props.data.fileName}</p></span> : <img src = {props.data.url} alt={props.data.fileName} width="150" height="150"/>  }

      
      
    </a>
  );
};

export default FileMessage;
