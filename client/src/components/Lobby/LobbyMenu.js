import React from 'react'
import  { withRouter } from 'react-router-dom'

const LobbyMenu = ({history}) => {
    function onSubmitName (e) {
        if(e.keyCode === 13 && e.shiftKey === false && (/\S/.test(e.target.value))) {
            e.preventDefault();
            localStorage.setItem('settings',JSON.stringify({nickname:e.target.value}))
            history.push("/Room");
        }

    }
    return (
        <div className="name-input">
            <input type="text" onKeyDown={onSubmitName}></input>            
                  </div>
    )
}

export default withRouter(LobbyMenu)
