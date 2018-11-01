import React, {Component} from 'react';
import Nav from "./Nav.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";
const uuidv1 = require('uuid/v4');
// uuidv1();


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "Anonymous",
      messages: [],
  };
   this.grabInput = this.grabInput.bind(this)
   this.grabName = this.grabName.bind(this);
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
    
    let messageType = message.type
    // console.log(messageType, "message")

    const oldItems = this.state.messages;
    const newItems = [...oldItems, message];
    this.setState({
      // type: checkData(newMessage),
      messages: newItems
    });


  }
  

  // console.log(data, "data")
  // switch(data.type) {
  //   case 'notification':
  //     this.setState
  //     break;
  //   case 'message':
      
  //     break;
  // }
  // console.log(data, "data2")

  componentDidMount() {

    
      // dataType = JSON.parse(data).type
      this.socket.onmessage = (message) => {
        // console.log(message, "hereR")
        const newMessage = JSON.parse(message.data)
        
        this.updateMessages(newMessage) 
  
      }

    this.socket.addEventListener("open", function(evt) {
      console.log("NEW CONNECTION");
      // console.log(evt, "evtxx");
  });


    // setTimeout(() => {

    //   const newMessage = this.newMessage
     
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({messages: messages})
    // }, 3000);
  }
  


  render() {

    return (

        
      <div> 
     <Nav/>
     <MessageList messages={this.state.messages} />
     <ChatBar grabName={this.grabName} grabInput={this.grabInput} currentUser={this.state.currentUser}/>
     
     </div>
 
    );
  }
}
export default App;
