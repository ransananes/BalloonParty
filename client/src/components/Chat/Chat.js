import React from 'react';
import { SocketContext } from '../context/socket';
import Message from './Messages/Message'
import './Chat.css'

class Chat extends React.Component {
    static contextType = SocketContext;
    nickname = "רן המלך";
    currentDate = new Date();
    constructor() {
      super();
      this.state = {
          text: "",
          messageList: [],
          chatStatus: false,
        };
    // eslint-disable-next-line 
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
        }        
    }


    componentDidMount() {
        if(localStorage.getItem('settings')) {
            this.nickname = JSON.parse(localStorage.getItem('settings')).nickname;
        }
        const message = {
            name : this.nickname,
            time : this.currentDate.timeNow(),
            type: 'connection',
        }
    // on user connection to chat
    this.context.on('user_connected',() => {
        this.context.emit('user_joined_sent',message);
    })

    this.context.on('user_joined_received', (data) => {
        this.setState({messageList: [...this.state.messageList, data.data_msg]})
    }) 
    this.context.on('user_disconnect',(data) => {
            const message = {
                name : data.user_name,
                time : this.currentDate.timeNow(),
                type: 'disconnection',
            }
            //💥 🌊
            this.setState({messageList: [...this.state.messageList, message]})
            }) 
    // on message received
    this.context.on('message_received',data => { 
        this.setState({messageList: [...this.state.messageList, data]})
    })
    // starts game 
    this.context.on('Starting Game', () => this.gameStartMessage(3));
    // changes chat name
    this.context.on('updatechatnick', (data) => {
        this.nickname = data; localStorage.setItem('settings',JSON.stringify({nickname:data}))
    })
}
        // handle game Start message
    gameStartMessage = (seconds) => {
        const gameStartInterval = setInterval(()=>{
            if(seconds > 0)
            {
            const message = {
                time: seconds,
                type: 'gameStart',
            }
            this.setState({messageList: [...this.state.messageList, message]});
        }
            // clears on game start
            else
            {
                clearInterval(gameStartInterval);
                const message = {
                    time:0,
                    type: 'gameStart',
                }
                this.setState({messageList: [...this.state.messageList, message]});
            }
            seconds--;
         }, 1000);
    }
    // handles on change input
    handleChange = (e) => {
        this.setState({text: e.target.value})
    }
    onSubmitMessage = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false && (/\S/.test(this.state.text))) {
            e.preventDefault();
            const data = {
                name : this.nickname,
                time : this.currentDate.timeNow(),
                type: "text",
                text: this.state.text
            };
            this.context.emit('message',data);
            // add message and reset input
            this.setState({messageList: [...this.state.messageList, data], text: ""})
          }
        }
    render() {
    return (
        <div className="Chat" style={this.state.chatStatus === false ? {display: 'flex'} : {width:'2%'}}>
            <button className="chat-option" onClick={() => this.setState({chatStatus: !this.state.chatStatus})}> {String.fromCharCode(8592)}</button>
        <div className="messages" style={this.state.chatStatus === false ? {display: 'block'} : {display:'none'}}>
        {this.state.messageList.map((message, i) => {
          return <Message message={message} key={i} />;
        })}
        </div>
            <div className="input" style={this.state.chatStatus === false ? {display: 'block'} : {display:'none'}}>
            <textarea placeholder="הקלד/י הודעה" data-placeholder-text="typeHereToChat" maxLength="40" value={this.state.text} onChange={this.handleChange} onKeyDown={this.onSubmitMessage} ></textarea>
            </div>
        </div>
        );
    }
}
    
export default Chat;
