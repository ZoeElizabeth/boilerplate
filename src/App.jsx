import React, {Component} from 'react';
// import Message from "./Message.jsx";
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
      type: "postMessage",
      id: uuidv1(),
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
      type: "postNotification",
      username: name,
      content: `${this.state.username} has changed their name to ${name}`}, () => {
      // console.log("after setting state", this.state);
      this.socket.send(JSON.stringify(this.state))
    });
    
  }

  

  componentDidMount() {

      this.socket.onmessage = (message) => {
        console.log(message, "hereR")
        const newMessage = JSON.parse(message.data)
  
        const oldItems = this.state.messages;
        const newItems = [...oldItems, newMessage];
        this.setState({
          // username: message.username,
          messages: newItems
        });

      }

    this.socket.addEventListener("open", function(evt) {
      console.log("NEW CONNECTION");
      console.log(evt.data);
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
     
     <MessageList messages={this.state.messages} />
     <ChatBar grabName={this.grabName} grabInput={this.grabInput} currentUser={this.state.currentUser}/>
     
     </div>
 
    );
  }
}
export default App;
