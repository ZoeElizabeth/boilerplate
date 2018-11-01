import React, {Component} from 'react';


class ChatBar extends Component {

  chatBarContent(event){
 
    const content = event.target

    // console.log(this.props.grabInput())

      if (event.charCode === 13){
  
      this.props.grabInput(content.value)

      content.value = "";    
  
      }

  }
  
  grabName(event){
    const content = event.target

      // if (event.charCode === 13){
  
        this.props.grabName(content.value)
      // }
    }

  render() {

    return (
<footer className="chatbar">
  <input className="chatbar-username" onChange={this.grabName.bind(this)} placeholder="name" />
  <input name="messageInput" className="chatbar-message" onKeyPress={this.chatBarContent.bind(this)} placeholder="Type a message and hit ENTER" />
  </footer>
    );
  }
}

export default ChatBar;
