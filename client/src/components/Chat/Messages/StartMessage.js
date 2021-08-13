import React from 'react';


const StartMessage = (props) => {
  return <div className="message-game-start">
    {props.time === 0 ? " המשחק התחיל" : " המשחק יתחיל בעוד" + " \t" +props.time}
     </div>;
}
export default StartMessage;
