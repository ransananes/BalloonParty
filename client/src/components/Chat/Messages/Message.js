import React, { Component } from 'react';
import TextMessage from './TextMessage';
import ConnectionMessage from './ConnectionMessage';
import './styles/Message.css';
import DisconnectionMessage from './DisconnectionMessage';
import StartMessage from './StartMessage';

class Message extends Component {

  _renderMessageOfType(type) {
    switch(type) {
    case 'text':
      return <TextMessage {...this.props.message} />;
    case 'connection':
      return <ConnectionMessage {...this.props.message} />;
    case 'disconnection':
      return <DisconnectionMessage {...this.props.message}/>;
    case 'gameStart':
      return <StartMessage {...this.props.message}/>;
    default:
      console.error(`Attempting to load message with unsupported file type '${type}'`);
    }
  }

  render () {
    return (
      <div className="message" style={this.props.message.type === "text" ? {color: '#ffffff', width: '100%',textAlign : 'right'} : {color: 'rgb(144, 153, 238)',textAlign : 'center'}}>
        <span className="name" dir="auto">{this.props.message.type === "text" ? this.props.message.name + ":" : this.props.message.name } </span>
        {this._renderMessageOfType(this.props.message.type)}
          <span className="time" dir="auto" style={this.props.message.type === "text" ? {display:'block'} : {display:'none'}}>  {this.props.message.time}</span>
        </div>
      );
  }
}

export default Message;
