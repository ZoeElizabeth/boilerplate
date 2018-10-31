import React, {Component} from 'react';
// import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";
const uuidv1 = require('uuid/v4');
uuidv1();



const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: "1",
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: "2",
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const currentUser = data;

class App extends Component {

  constructor(props) {
  super(props)

    this.state = {
      loading: true,
      username: "adsa",
      messages: [],
    }
   this.grabInput = this.grabInput.bind(this)
   this.socket = new WebSocket( "ws://localhost:3001");
  }

  grabInput(input) {

    const newMessage = {
      id: uuidv1(),
      username: "fred",
      content: input,
    };   
    // console.log(username, "username")
    
    this.socket.send(JSON.stringify(newMessage))

  }

  grabName(name) {
console.log(name)
      const newUser = {
        id: uuidv1(),
        username: "kal",
    
      };   
      // console.log(username, "username")
      
      // this.socket.send(JSON.stringify(name))
  
    }

  

  componentDidMount() {

    // WebSocket WebSocket(
    //   in DOMString url,
    //   in optional DOMString protocols
    //   );
    // this.socket.addEventListener( (message) => {
      
    //   console.log("test", message);
    // });
      this.socket.onmessage = (message) => {
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
