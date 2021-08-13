import React from 'react';
import Linkify from 'react-linkify';


const TextMessage = (props) => {
  return <div className="message-text">{
    
      <Linkify properties={{ target: '_blank' }}> {props.text}</Linkify>
    }</div>;
}
export default TextMessage;
