//App set up
import React, {Component} from 'react';
import Nav from "./Nav.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";
const uuidv1 = require('uuid/v4');


//Creating App enviroment
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "Anonymous",
      messages: [],
      count: 0,
  };
   this.grabInput = this.grabInput.bind(this);
   this.grabName = this.grabName.bind(this);
   this.userCount = this.userCount.bind(this);
   this.socket = new WebSocket( "ws://localhost:3001");
  }

  //grabing message content from user
  grabInput(input) {
 
    const newMessage = {
      id: uuidv1(),
      type: "message",
      username: this.state.username || "Anonymous",
      content: input,
    };   

    // console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage));

  }

  //grabbing name from user
  grabName(name) {
  
    this.setState({ 
      id: uuidv1(),
      type: "notification",
      username: name,
      content: `${this.state.username} has changed their name to ${name}` }, () => {
      // console.log("after setting state", this.state);
      this.socket.send(JSON.stringify(this.state));
    });
  }

  //counting online users
  userCount(count) {
    this.setState({
      count: count,
    });
  }

  //loading new messages and notifications to body
  updateMessages(message) {

    const oldItems = this.state.messages;
    const newItems = [...oldItems, message];
    this.setState({
      messages: newItems,
    });
  }
  

//Rendering items on mount
  componentDidMount() {

  
  this.socket.onmessage = (message) => {

    const newMessage = JSON.parse(message.data);

    switch (newMessage.type) {
      case "message":
      this.updateMessages(newMessage);
      break;
      case "notification":
      this.updateMessages(newMessage);
      break;
      case "count":
      this.userCount(newMessage);
      break;
    }
  }

    this.socket.onopen = (evt) => {
      console.log("NEW CONNECTION");
    }
  }
  

//App full render
  render() {
    return ( 
    <div> 
      <Nav count={this.state.count} />
      <MessageList messages={this.state.messages} />
      <ChatBar grabName={this.grabName} grabInput={this.grabInput} currentUser={this.state.currentUser}/>
    </div>
    );
  }
};
export default App;
