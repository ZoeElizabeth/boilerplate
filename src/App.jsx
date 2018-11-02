import React, {Component} from 'react';
import Nav from "./Nav.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";
const uuidv1 = require('uuid/v4');


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "Anonymous",
      messages: [],
      count: 0,
  };
   this.grabInput = this.grabInput.bind(this)
   this.grabName = this.grabName.bind(this);
   this.userCount = this.userCount.bind(this);
   this.socket = new WebSocket( "ws://localhost:3001");
  }

  grabInput(input) {
 
    const newMessage = {
      id: uuidv1(),
      type: "message",
      username: this.state.username || "Anonymous",
      content: input,
    };   

    // console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage))

  }

  grabName(name) {
    // console.log("before setting state", this.state);
    this.setState({ 
      id: uuidv1(),
      type: "notification",
      username: name,
      content: `${this.state.username} has changed their name to ${name}`}, () => {
      // console.log("after setting state", this.state);
      this.socket.send(JSON.stringify(this.state))
    });
  }

  updateMessages(message) {

    const oldItems = this.state.messages;
    const newItems = [...oldItems, message];
    this.setState({

      messages: newItems
    });
  }
  
  userCount(count) {
    console.log(count, "num")
    this.setState({

      count: count
    });
  }

  componentDidMount() {

  
  this.socket.onmessage = (message) => {

    const newMessage = JSON.parse(message.data)


  if (newMessage.type === "count"){
    this.userCount(newMessage)
  }else if 
  (newMessage.type === "message" || "notification"){
    this.updateMessages(newMessage) 
  }
}

    this.socket.onopen = (evt) => {
      console.log("NEW CONNECTION");

    };
  }
  


  render() {
    // let count = this.socket.__proto__.OPEN
    return (

        
    <div> 
      <Nav count={this.state.count} />
      <MessageList messages={this.state.messages} />
      <ChatBar grabName={this.grabName} grabInput={this.grabInput} currentUser={this.state.currentUser}/>
     
    </div>
 
    );
  }
}
export default App;
