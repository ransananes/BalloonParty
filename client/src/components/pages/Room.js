import React from 'react'
import Chat from '../../components/Chat/Chat'
import Game from '../../components/Game/Game'
import {SocketContext, socket} from '../../components/context/socket';
import { withRouter } from 'react-router-dom';

function Room() {
    return (
        <div>
        <SocketContext.Provider value={socket}>
        <Game/>
        <Chat/>
      </SocketContext.Provider>
        </div>
    )
}

export default withRouter(Room)
