import React, {Component} from 'react';
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";

class App extends Component {
  render() {
    return (

        
      <div> 
     
     <MessageList/>
     <ChatBar/>
     
     </div>
 
    );
  }
}
export default App;
