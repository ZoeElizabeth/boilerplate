import React, {Component} from 'react';
// import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";

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

export const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");



const currentUser = data;

class App extends Component {

  constructor(props) {
  super(props)

    this.state = {
      loading: true,
      currentUser: currentUser,
      messages: currentUser.messages
    }
   this.grabInput = this.grabInput.bind(this)
  }

  grabInput(input) {

    const newMessage = {
      id: generateRandomId(),
      username: this.state.currentUser.currentUser.name,
      content: input,
    };   
    
    const oldItems = this.state.messages;
    const newItems = [...oldItems, newMessage];

    this.setState({
      messages: newItems
    });
  }

  

  componentDidMount() {

    // setTimeout(() => {

      // const newMessage = newMessage
     
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({messages: messages})
    // }, 3000);
  }
  


  render() {

    return (

        
      <div> 
     
     <MessageList messages={this.state.messages} />
     <ChatBar grabInput={this.grabInput} currentUser={this.state.currentUser}/>
     
     </div>
 
    );
  }
}
export default App;
