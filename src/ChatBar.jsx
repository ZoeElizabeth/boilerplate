import React, {Component} from 'react';

console.log(this)
class ChatBar extends Component {

  chatBarContent(event){
 

    const content = event.target

      if (event.charCode === 13){
  
      this.props.grabInput(content.value)

      content.value = "";
      
  
      }


      // const username = event.target

      // this.props
  }
  
  grabName(event){
 
    console.log(event)

    const content = event.target

      if (event.charCode === 13){
  
      this.props.grabName(content.value)

      content.value = "";
      
  
      }
    }

  render() {

    return (
<footer className="chatbar">
  <input className="chatbar-username" onKeyPress={this.grabName.bind(this)} placeholder="name" />
  <input name="messageInput" className="chatbar-message" onKeyPress={this.chatBarContent.bind(this)} placeholder="Type a message and hit ENTER" />
  </footer>
    );
  }
}

export default ChatBar;
