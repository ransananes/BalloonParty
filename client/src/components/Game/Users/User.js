import React, {Component} from 'react';
import duckuser from '../assets/duck-user.png'
import './User.css'

class User extends Component {
    render () {
        let deg = 0;
    switch(this.props.hp){
        case 3:
          deg = 0
          break;
        case 2:
          deg = 170
          break;
        case 1:
            deg = 180
        case 0: 
            deg = 77
        default:
            deg = 0
      }
  //  let deg = 45 ;
//    const circle_users = 'transform: rotate('+deg+ ')translateX(100px)'
    //transform: `rotate(${deg}deg) rotate(-${deg}deg)`
    return (
        <div className="user" id={this.props.id}>
            <span className="name" dir="auto">{this.props.name}</span>
            
            <img className="avatar" src={duckuser} style={{filter: 'hue-rotate('+deg+'deg)'}} alt={this.props.name}/>
            <span className="input" dir="auto">{this.props.text}</span>

        </div>
    )
}
}

export default User
