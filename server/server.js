const express = require('express');
const http = require("http");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const path = require('path');

// Enables CORS (prevent xml injection)
const io = socket(server, {cors: true});
app.use(cors());

  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'))
  })



// currenty global room
const room = {users:[],gameStarted: false,words_used: [],syllable: "",roundTime: 0,currentUser: 0,messages: [],}
var fs = require('fs')
var words = fs.readFileSync('./server/words.txt').toString().split("\n");
var syllables = fs.readFileSync('./server/syllables.txt').toString().split("\n");


io.on('connection', onConnection);
function onConnection(socket){
  // add user to the room
  //room.users.push(socket.id);
  socket.emit('user_connected')
  socket.on('user_joined_sent', (data) => {room.users.push({name: data.name, socket_id: socket.id, health: 3}); const all_data = {data_msg : data, users: room.users, syllable: room.syllable}; io.emit('user_joined_received', all_data); })
  socket.on('message', (data) => 
  {
    if(data.text == "/start" && !room.gameStarted) {
     room.gameStarted = true;  
     room.syllable = syllables[generateRandomSyllable(59)];
     // emits to the first user in the userlist
     io.emit('Starting Game',{syllable: room.syllable, users: room.users});
     io.to(room.users[room.currentUser].socket_id).emit('Turn');
    }
    else if (data.text == "/restart" && room.gameStarted)
    {
      room.syllable = syllables[generateRandomSyllable(59)];
      restartMatch();
      io.emit('Starting Game',{syllable: room.syllable, users: room.users});
      io.to(room.users[room.currentUser].socket_id).emit('Turn')
    }
    else if (data.text.split(" ")[0] == "/name")
    {
      for (let index = 0; index < room.users.length; index++) {
        // new name
        if (room.users[index].socket_id === socket.id) {
          room.users[index].name = data.text.split(" ")[1]
          }
      }
      socket.emit('updatechatnick',(data.text.split(" ")[1]));
      io.emit('updateNickNames', {id: socket.id, nickname: data.text.split(" ")[1]})
    }
    else socket.broadcast.emit('message_received', data)
  });
  // on disconnect
  socket.on('disconnect',() => {let name = removeDisconnectedUser(socket.id); if (name==null) return; socket.broadcast.emit('user_disconnect',{user_name : name, socket_id : socket.id})});
  
  // on text change value
  socket.on('changedTextValue',(data) => socket.broadcast.emit('updateTextInputs',data));

  socket.on('wrongAnswer',() => {io.emit('incorrectAnswer')})

  // on answer
  socket.on('checkAnswer', (data) => {
    if(checkForValidWord(words,data.text) && !(room.words_used.includes(data.text)))
    {
    room.words_used.push(data.text);
    room.currentUser++;
    // checks if reached to the end
    if(room.currentUser == room.users.length)
      room.currentUser = 0;
    // changes syllable
    room.syllable = syllables[generateRandomSyllable(46)];
    // emits to the next user in the userlist and add time
    //const data = {syllable : room.syllable, timeAddition: data.timeAddition}
    io.emit('correctAnswer',room.syllable)
    io.to(room.users[room.currentUser].socket_id).emit('Turn',data.timeAddition);
    }
    else{
       io.emit('incorrectAnswer')
  }
  })
  socket.on('user_animation', (data) => {
    io.emit('user_animated', data)
  })
  socket.on('timesUp', () => {
    room.users[room.currentUser].health--;
    socket.broadcast.emit('setWaterBalloonExplosion');
    io.emit('lostHP',room.users[room.currentUser].socket_id)
    if (getaliveCount() <= 1)
    {
       io.emit('Winner')
  }
  })

  socket.on('startNewTurn', () => {
    room.currentUser++;
    if (getaliveCount() <= 1)
    {
       io.emit('Winner')
    }
    if(room.currentUser == room.users.length)
      room.currentUser = 0;
    while(room.users[room.currentUser].health == 0)
    {
      room.currentUser++;
     if (room.currentUser == room.users.length)
          room.currentUser = 0;
    }

    // changes syllable
    room.syllable = syllables[generateRandomSyllable(46)];
    // emits to the next user in the userlist and clears data
    io.emit('correctAnswer',room.syllable)
    io.to(room.users[room.currentUser].socket_id).emit('Turn');
  })
}

// generates new syllable
function generateRandomSyllable(max) {
  return Math.floor(Math.random() * max) + 1;
}
// check if contains word
function ContainsExactWord(words, compare) {
  if (words.length-1 == compare.length)
  {
  for (var i = 0; i < words.length-1; ++i) {
      if(words[i] != compare[i]) 
        return false;
  }
  return true;
}
return false;

}
function checkForValidWord(words,data)
{
  for(i in words) {
    var test = ContainsExactWord(words[i],data);
    if(test)
      return true;
    else continue;
  }
  return false;
}

function removeDisconnectedUser(id) {
  for (var i = 0; i < room.users.length; i++) {
    if (room.users[i].socket_id == id) {
        let name = room.users[i].name;
        room.users.splice(i,1)
        return name;
    }
  }
}
function restartMatch() {
  for (var i = 0; i < room.users.length; i++) {
      room.users[i].health = 3;
    }
  }
function getaliveCount() {
  let aliveCount = 0;
  for (var i = 0; i < room.users.length; i++) {
    if (room.users[i].health != 0) {
      aliveCount++;
    }
  }
  return aliveCount;
}

server.listen(port, () => console.log('server is running on port 5000'));
