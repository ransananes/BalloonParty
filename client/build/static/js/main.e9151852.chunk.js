(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t,s){},105:function(e,t,s){},106:function(e,t,s){},107:function(e,t,s){},113:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s.n(n),i=s(49),c=s.n(i),r=s(114),o=s(9),l=s(15),u=s(11),m=s(12),h=s(14),d=s(13),p=s(50),x=s.n(p)()("https://balloonparty.herokuapp.com/",{secure:!0}),b=a.a.createContext(x),g=s(20),f=s(51),j=s.n(f),v=s(0),y=function(e){return Object(v.jsx)("div",{className:"message-text",children:Object(v.jsxs)(j.a,{properties:{target:"_blank"},children:[" ",e.text]})})},O=function(e){return Object(v.jsx)("div",{className:"message-connection",children:" \u05d4\u05e6\u05d8\u05e8\u05e4/\u05d4 \u05dc\u05d7\u05d3\u05e8 "})},S=(s(104),function(e){return Object(v.jsx)("div",{className:"message-disconnect",children:" \u05e2\u05d6\u05d1/\u05d4 \u05d0\u05ea \u05d4\u05d7\u05d3\u05e8 "})}),_=function(e){return Object(v.jsx)("div",{className:"message-game-start",children:0===e.time?" \u05d4\u05de\u05e9\u05d7\u05e7 \u05d4\u05ea\u05d7\u05d9\u05dc":" \u05d4\u05de\u05e9\u05d7\u05e7 \u05d9\u05ea\u05d7\u05d9\u05dc \u05d1\u05e2\u05d5\u05d3 \t"+e.time})},w=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){return Object(u.a)(this,s),t.apply(this,arguments)}return Object(m.a)(s,[{key:"_renderMessageOfType",value:function(e){switch(e){case"text":return Object(v.jsx)(y,Object(g.a)({},this.props.message));case"connection":return Object(v.jsx)(O,Object(g.a)({},this.props.message));case"disconnection":return Object(v.jsx)(S,Object(g.a)({},this.props.message));case"gameStart":return Object(v.jsx)(_,Object(g.a)({},this.props.message));default:console.error("Attempting to load message with unsupported file type '".concat(e,"'"))}}},{key:"render",value:function(){return Object(v.jsxs)("div",{className:"message",style:"text"===this.props.message.type?{color:"#ffffff",width:"100%",textAlign:"right"}:{color:"rgb(144, 153, 238)",textAlign:"center"},children:[Object(v.jsxs)("span",{className:"name",dir:"auto",children:["text"===this.props.message.type?this.props.message.name+":":this.props.message.name," "]}),this._renderMessageOfType(this.props.message.type),Object(v.jsxs)("span",{className:"time",dir:"auto",style:"text"===this.props.message.type?{display:"block"}:{display:"none"},children:["  ",this.props.message.time]})]})}}]),s}(n.Component),k=(s(105),function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){var e;return Object(u.a)(this,s),(e=t.call(this)).nickname=JSON.parse(localStorage.getItem("settings")).nickname,e.currentDate=new Date,e.gameStartMessage=function(t){var s=setInterval((function(){if(t>0){var n={time:t,type:"gameStart"};e.setState({messageList:[].concat(Object(l.a)(e.state.messageList),[n])})}else{clearInterval(s);e.setState({messageList:[].concat(Object(l.a)(e.state.messageList),[{time:0,type:"gameStart"}])})}t--}),1e3)},e.handleChange=function(t){e.setState({text:t.target.value})},e.onSubmitMessage=function(t){if(13===t.keyCode&&!1===t.shiftKey&&/\S/.test(e.state.text)){t.preventDefault();var s={name:e.nickname,time:e.currentDate.timeNow(),type:"text",text:e.state.text};e.context.emit("message",s),e.setState({messageList:[].concat(Object(l.a)(e.state.messageList),[s]),text:""})}},e.state={text:"",messageList:[],chatStatus:!1},Date.prototype.timeNow=function(){return(this.getHours()<10?"0":"")+this.getHours()+":"+(this.getMinutes()<10?"0":"")+this.getMinutes()},e}return Object(m.a)(s,[{key:"componentDidMount",value:function(){var e=this,t={name:this.nickname,time:this.currentDate.timeNow(),type:"connection"};this.context.on("user_connected",(function(){e.context.emit("user_joined_sent",t)})),this.context.on("user_joined_received",(function(t){e.setState({messageList:[].concat(Object(l.a)(e.state.messageList),[t.data_msg])})})),this.context.on("user_disconnect",(function(t){var s={name:t.user_name,time:e.currentDate.timeNow(),type:"disconnection"};e.setState({messageList:[].concat(Object(l.a)(e.state.messageList),[s])})})),this.context.on("message_received",(function(t){e.setState({messageList:[].concat(Object(l.a)(e.state.messageList),[t])})})),this.context.on("Starting Game",(function(){return e.gameStartMessage(3)}))}},{key:"render",value:function(){var e=this;return Object(v.jsxs)("div",{className:"Chat",style:!1===this.state.chatStatus?{display:"flex"}:{width:"2%"},children:[Object(v.jsxs)("button",{className:"chat-option",onClick:function(){return e.setState({chatStatus:!e.state.chatStatus})},children:[" ",String.fromCharCode(8592)]}),Object(v.jsx)("div",{className:"messages",style:!1===this.state.chatStatus?{display:"block"}:{display:"none"},children:this.state.messageList.map((function(e,t){return Object(v.jsx)(w,{message:e},t)}))}),Object(v.jsx)("div",{className:"input",style:!1===this.state.chatStatus?{display:"block"}:{display:"none"},children:Object(v.jsx)("textarea",{placeholder:"\u05d4\u05e7\u05dc\u05d3/\u05d9 \u05d4\u05d5\u05d3\u05e2\u05d4","data-placeholder-text":"typeHereToChat",maxLength:"40",value:this.state.text,onChange:this.handleChange,onKeyDown:this.onSubmitMessage})})]})}}]),s}(a.a.Component));k.contextType=b;var N,A,I,T,D,C,L,B,M=k,P=s(19),E=(s(106),s.p+"static/media/waterballoon.7aca84cc.png"),U=s.p+"static/media/duck-user.41cabf10.png",H=(s(107),function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){return Object(u.a)(this,s),t.apply(this,arguments)}return Object(m.a)(s,[{key:"render",value:function(){var e=0;switch(this.props.hp){case 3:e=0;break;case 2:e=170;break;case 1:e=180;case 0:e=77;default:e=0}return Object(v.jsxs)("div",{className:"user",id:this.props.id,children:[Object(v.jsx)("span",{className:"name",dir:"auto",children:this.props.name}),Object(v.jsx)("img",{className:"avatar",src:U,style:{filter:"hue-rotate("+e+"deg)"},alt:this.props.name}),Object(v.jsx)("span",{className:"input",dir:"auto",children:this.props.text})]})}}]),s}(n.Component)),V=s.p+"static/media/water_drip.803a298a.wav",K=s.p+"static/media/water_explode.139eea49.wav",W=s.p+"static/media/winner_sound_effect.42321c98.wav",G=s.p+"static/media/water_error.84b2cce7.wav",J=s(52),R=s.n(J),q=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){var e;return Object(u.a)(this,s),(e=t.call(this)).changeTextValueByID=function(t,s){for(var n=0;n<e.state.user_names.length;n++)if(e.state.user_names[n].id===t){var a=e.state.user_names;a[n].text=s,e.setState({user_names:a})}},e.reduceHealth=function(t){for(var s=0;s<e.state.user_names.length;s++)if(e.state.user_names[s].id===t){var n=e.state.user_names;n[s].hp--,e.setState({user_names:n})}},e.userTurn=function(t){void 0==t&&(t=0),setTimeout(function(){A.hidden=!1,this.setState({timePassed:this.state.timePassed-t})}.bind(Object(P.a)(e)),500),B=setInterval(function(){this.setState({timePassed:this.state.timePassed+1e3}),this.state.timePassed>=13e3&&(this.setState({timePassed:0}),this.timesUp(!0),clearInterval(B))}.bind(Object(P.a)(e)),1e3),x.emit("user_animation",e.context.id)},e.userAnimation=function(t){!0===A.hidden&&(document.getElementById(e.context.id).style.animation="");(I=document.getElementById(t)).style.animation="heartBeat infinite",I.style.animationDuration="2s"},e.handleChange=function(t){e.changeTextValueByID(e.context.id,t.target.value);var s={id:e.context.id,value:t.target.value};e.context.emit("changedTextValue",s),e.setState({text:t.target.value})},e.onSubmitMessage=function(t){if(13===t.keyCode&&!1===t.shiftKey&&/\S/.test(e.state.text))if(t.preventDefault(),e.checkIfSyllableExists(e.state.text,e.state.syllable)){var s={text:e.state.text,timeAddition:B+2e3};e.context.emit("checkAnswer",s)}else e.context.emit("wrongAnswer")},e.checkIfSyllableExists=function(e,t){if(e.length>=t.length)for(var s=0;s<e.length;s++)if(e[s]===t[0])for(var n=1;n<t.length&&t[n]===e[n];n++)if(t.length-1===n)return!0;return!1},e.state={users:[],user_names:[],text:"",syllable:"",timePassed:0},e}return Object(m.a)(s,[{key:"componentDidMount",value:function(){var e=this;N=document.getElementById("balloon"),A=document.getElementById("input"),(T=new Audio(V)).volume=.05,T.loop=!0,(D=new Audio(K)).volume=.3,(C=new Audio(W)).volume=.2,(L=new Audio(G)).volume=.2,this.context.on("user_joined_received",(function(t){e.setState({users:t.users,syllable:t.syllable}),e.setState({user_names:e.getUserNames(t.users)})})),this.context.on("user_disconnect",(function(t){e.removeDisconnectedUser(t.socket_id)})),this.context.on("Starting Game",(function(t){try{clearInterval(B)}catch(s){}e.setState({users:t.users,user_names:e.getUserNames(t.users)}),setTimeout(function(){t.syllable=t.syllable.substring(0,t.syllable.length-1),T.play(),this.setState({syllable:t.syllable})}.bind(e),3500)})),this.context.on("Turn",(function(t){e.userTurn(t)})),this.context.on("user_animated",(function(t){e.userAnimation(t)})),this.context.on("updateTextInputs",(function(t){e.changeTextValueByID(t.id,t.value)})),this.context.on("correctAnswer",(function(t){t=t.substring(0,t.length-1),e.correctAnswer(t)})),this.context.on("incorrectAnswer",(function(){return e.incorrectAnswer()})),this.context.on("setWaterBalloonExplosion",(function(){return e.timesUp(!1)})),this.context.on("lostHP",(function(t){return e.reduceHealth(t)})),this.context.on("Winner",(function(t){return e.Winner(t)}))}},{key:"getUserNames",value:function(e){for(var t=[],s=0;s<e.length;s++){var n={id:e[s].socket_id,name:e[s].name,text:"",hp:e[s].health};t.push(n)}return t}},{key:"removeDisconnectedUser",value:function(e){for(var t=this.state.users,s=this.state.user_names,n=0;n<t.length;n++)t[n].socket_id!==e||(t.splice(n,1),s.splice(n,1));this.setState({users:t,user_names:s})}},{key:"correctAnswer",value:function(e){this.setState({text:"",syllable:e}),this.changeTextValueByID(this.context.id,"");var t={id:this.context.id,value:""};this.context.emit("changedTextValue",t),void 0!==I&&(I.style.animation=""),A.hidden=!0,clearInterval(B)}},{key:"incorrectAnswer",value:function(){N.style.animation="",N.style.animation="shake 0.5s infinite",L.play(),setTimeout((function(){N.style.animation="shake 4s infinite"}),500)}},{key:"timesUp",value:function(e){console.log("timesup"),N.style.animation="",N.setAttribute("data-dis-type","self-contained"),N.setAttribute("data-dis-particle-type","ExplodingParticle"),N.setAttribute("data-dis-reduction-factor","100"),N.setAttribute("data-dis-color","[90, 169, 235]"),R.a.init(),N.classList.add("animate"),setTimeout(function(){N.classList.remove("animate"),D.play(),e&&this.context.emit("startNewTurn")}.bind(this),1300),e&&this.context.emit("timesUp")}},{key:"Winner",value:function(){clearInterval(B),T.pause(),C.play()}},{key:"render",value:function(){return Object(v.jsx)("div",{className:"Balloon-Party",children:Object(v.jsxs)("div",{className:"Game",id:"game",children:[Object(v.jsx)("span",{className:"syllable-txt",children:this.state.syllable}),Object(v.jsx)("img",{className:"balloon",id:"balloon",src:E,alt:"Balloon"}),Object(v.jsx)("div",{className:"users",children:this.state.user_names&&this.state.user_names.map((function(e){return Object(v.jsx)(H,{id:e.id,hp:e.hp,name:e.name,text:e.text},e.id)}))}),Object(v.jsx)("div",{id:"input",className:"input-answer",hidden:!0,children:Object(v.jsx)("textarea",{placeholder:"\u05d4\u05e7\u05dc\u05d3/\u05d9 \u05ea\u05e9\u05d5\u05d1\u05d4","data-placeholder-text":"typeheretoanswer",maxLength:"40",value:this.state.text,onChange:this.handleChange,onKeyDown:this.onSubmitMessage})})]})})}}]),s}(n.Component);q.contextType=b;var z=Object(r.d)((function(){return Object(v.jsx)("div",{children:Object(v.jsxs)(b.Provider,{value:x,children:[Object(v.jsx)(q,{}),Object(v.jsx)(M,{})]})})}));var F=function(){var e=Object(o.a)({forceRefresh:!0});return Object(v.jsx)("div",{children:Object(v.jsx)(r.b,{history:e,children:Object(v.jsx)(r.c,{children:Object(v.jsx)(r.a,{exact:!0,path:"/",component:z})})})})};c.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(F,{})}),document.getElementById("root"))}},[[113,1,2]]]);
//# sourceMappingURL=main.e9151852.chunk.js.map