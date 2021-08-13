import React, { Component } from 'react'

import './Game.css'
import {socket, SocketContext} from '../../components/context/socket'
import waterballoon from './assets/waterballoon.png'
import User from './Users/User';
// sound
import water_drip from './assets/audio/water_drip.wav'
import water_explosion from './assets/audio/water_explode.wav'
import water_winner from './assets/audio/winner_sound_effect.wav'
import water_error from './assets/audio/water_error.wav'


import disintegrate from 'disintegrate'
var balloon_elm, input_elm,current_user, water_drip_sound, water_explosion_sound,water_winner_sound,water_error_sound, timer;
const max_seconds = 13000;
const correctAnswer_time = 2000;
export default class Game extends Component {
    static contextType = SocketContext;
    constructor() {
        super();
        this.state = {
            users: [],
            user_names: [],
            text: "",
            syllable: "",
            timePassed: 0,
          };
    }
    
    componentDidMount(){
        // get balloon element
        balloon_elm = document.getElementById('balloon');

        // get input element
        input_elm = document.getElementById('input');
        
        // declaring audios
        water_drip_sound = new Audio(water_drip);
        water_drip_sound.volume = 0.05;
        water_drip_sound.loop = true;

        water_explosion_sound = new Audio(water_explosion);
        water_explosion_sound.volume = 0.3;
        
        water_winner_sound = new Audio(water_winner);
        water_winner_sound.volume = 0.2;

        water_error_sound = new Audio(water_error);
        water_error_sound.volume = 0.2;
        this.context.on("user_joined_received", data => {
            this.setState({users:data.users, syllable:data.syllable})
            this.setState({user_names: this.getUserNames(data.users)})
        })
        this.context.on('user_disconnect',(data) => {this.removeDisconnectedUser(data.socket_id)})

        // gets syllable
        this.context.on('Starting Game', (data) => {
            //this.setState({currentTime: data.roundTime});
            // resets timer if possible
            try{clearInterval(timer);}
            catch{
                // do nothing
            }
            this.setState({users:data.users,user_names: this.getUserNames(data.users)})
            setTimeout(function () {data.syllable = data.syllable.substring(0, data.syllable.length - 1); water_drip_sound.play(); this.setState({syllable:data.syllable})}.bind(this),3500)
            
            //const timesUpFunc = this.timesUp.bind(this);
            //roundTimer = setInterval(timesUpFunc, data.roundTime*1000);
        })
        this.context.on('Turn', (data) => {this.userTurn(data)})
        // on socket user_animation
        this.context.on('user_animated', (data) => {this.userAnimation(data)})
        // update users input 
        this.context.on('updateTextInputs', (data) => {this.changeTextValueByID(data.id,data.value)})
        this.context.on('correctAnswer', (data) => {data = data.substring(0, data.length - 1); this.correctAnswer(data)})
        this.context.on('incorrectAnswer', () => this.incorrectAnswer())
        this.context.on('setWaterBalloonExplosion', () => this.timesUp(false));
        this.context.on('lostHP', (data) => this.reduceHealth(data))
        this.context.on('Winner', (data) => this.Winner(data))

        this.context.on('updateNickNames', (data) => this.updateUserNicknames(data))
    }   
    getUserNames(data) {
        let user_names = [];
        for (var i = 0; i < data.length; i++) {
                let id = data[i].socket_id;
                let name = data[i].name;
                let health = data[i].health;
                let text = "";
                const user = {id: id,name: name, text: text,hp:health}
                user_names.push(user);
            }
        return user_names;
    }
     removeDisconnectedUser(id) {
        let users = this.state.users;
        let user_names = this.state.user_names;
        for (var i = 0; i < users.length; i++) {
          if (users[i].socket_id === id) {
              users.splice(i,1)
              user_names.splice(i,1)
              continue
          }
        }
        this.setState({
            users: users,
            user_names: user_names
        })
    }
    changeTextValueByID = (id,text) =>  {
        for (let index = 0; index < this.state.user_names.length; index++) {
            if(this.state.user_names[index]['id'] === id)
            {
                let duplicate = this.state.user_names;
                duplicate[index]['text'] = text;
                this.setState({user_names: duplicate});
            }
        }

    }
    reduceHealth = (id) => {
        for (let index = 0; index < this.state.user_names.length; index++) {
            if(this.state.user_names[index]['id'] === id)
            {
                let duplicate = this.state.user_names;
                duplicate[index]['hp']--;
                this.setState({user_names: duplicate});
            }
        }
        
    }
    //handles user turn
    userTurn = (data) => {
        if (data == undefined) data = 0;
        console.log(this.state.syllable);
        setTimeout(function () {
            // shows input elemn
            input_elm.hidden = false; 
            this.setState({timePassed: this.state.timePassed-data})}.bind(this),500)
            timer = setInterval(function() {
            this.setState({timePassed: this.state.timePassed+1000})
            if(this.state.timePassed >= max_seconds)
            {
                this.setState({timePassed: 0})
                this.timesUp(true)
                clearInterval(timer);
            }
            }.bind(this), 1000);
            
        
        socket.emit('user_animation', this.context.id);
    }
    // handles user animation
    userAnimation = (data) => {
        if(input_elm.hidden === true) 
        {
            let user_elm_prev = document.getElementById(this.context.id);
            user_elm_prev.style.animation='';
        }
        current_user = document.getElementById(data);
        current_user.style.animation='heartBeat infinite';
        current_user.style.animationDuration='2s';
    }
    // handles on answer change input
    handleChange = (e) => {
        this.changeTextValueByID(this.context.id,e.target.value);
        const data = {id : this.context.id, value : e.target.value}
        this.context.emit('changedTextValue',data)
        this.setState({text: e.target.value})
    }
    // submits answer
    onSubmitMessage = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false && (/\S/.test(this.state.text))) {
            e.preventDefault();
            if (this.checkIfSyllableExists(this.state.text,this.state.syllable))
            {
            const data = { text: this.state.text, timeAddition: timer+correctAnswer_time}
            this.context.emit('checkAnswer',data);
            }
            else
            {
             this.context.emit('wrongAnswer');
            }
          }
        }
        // hebrew includes function, can't use js includes
        checkIfSyllableExists= (text,syllable) => {
            if(text.length >= syllable.length)
            {
            for (let index = 0; index < text.length; index++) {
                if(text[index] === syllable[0])
                {
                    for (let j = 1; j < syllable.length; j++) {
                        if(syllable[j] !== text[j]) break;
                        if(syllable.length-1 === j)
                            return true;
                    }
                }                
            }
        }
        return false;
        }
        correctAnswer (syllable) {
            this.setState({text: "",syllable:syllable});
            this.changeTextValueByID(this.context.id,"");
            const data = {id : this.context.id, value : ""}
            this.context.emit('changedTextValue',data)
            // checks if current turn 
            if(current_user !== undefined) current_user.style.animation='';
            input_elm.hidden = true;
            //resets timer;
            clearInterval(timer);
            
        }
        incorrectAnswer () {
            balloon_elm.style.animation='';
            balloon_elm.style.animation='shake 0.5s infinite';
            water_error_sound.play();
            setTimeout(function () {balloon_elm.style.animation='shake 4s infinite';},500)
        }
        timesUp (emit) {
            console.log("timesup");
            balloon_elm.style.animation='';
            // exploding water animation
            balloon_elm.setAttribute('data-dis-type',"self-contained")
            balloon_elm.setAttribute('data-dis-particle-type','ExplodingParticle')
            balloon_elm.setAttribute('data-dis-reduction-factor','100')
            balloon_elm.setAttribute('data-dis-color','[90, 169, 235]')
            disintegrate.init();
            balloon_elm.classList.add("animate")
            setTimeout(function () {
                balloon_elm.classList.remove("animate"); water_explosion_sound.play();
                if(emit){
                    this.context.emit('startNewTurn') 
                }
            }.bind(this),1300)
            if(emit)
            this.context.emit('timesUp')


            

        }
        Winner() {
            clearInterval(timer);
            water_drip_sound.pause();
            water_winner_sound.play();
        }
        updateUserNicknames (data) { 
            for (var i = 0; i < this.state.user_names.length; i++) {
                if(data.id == this.state.user_names[i].id)
                {
                var duplicate = this.state.user_names;
                duplicate[i].name = data.nickname;
                this.setState({user_names : duplicate})
                }
            }
        }
    render() {
        return (
            <div className="Balloon-Party">

            <div className="Game" id="game"> 
                <span className="syllable-txt">{this.state.syllable}</span>
                <img className="balloon" id="balloon" src={waterballoon} alt="Balloon"/>
                <div className="users">

                { this.state.user_names && this.state.user_names.map(user  => {
                return <User key={user.id} id={user.id} hp={user.hp} name={user.name}  text={user.text} />;
        })}
                </div>
                <div id="input" className="input-answer" hidden>
                <textarea placeholder="הקלד/י תשובה" data-placeholder-text="typeheretoanswer" maxLength="40" value={this.state.text} onChange={this.handleChange} onKeyDown={this.onSubmitMessage} ></textarea>
                </div>
            </div>
            </div>
        )
    }
        }
