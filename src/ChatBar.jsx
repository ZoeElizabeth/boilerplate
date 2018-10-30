import React, {Component} from 'react';

console.log(this)
class ChatBar extends Component {

  chatBarContent(event){
 

    const content = event.target.value

      if (event.charCode === 13){
  
      this.props.grabInput(content)
  
      }
  }
  
  render() {

    return (
<footer className="chatbar">
  <input className="chatbar-username" defaultValue={this.props.currentUser.currentUser.name} />
  <input name="messageInput" className="chatbar-message" onKeyPress={this.chatBarContent.bind(this)} placeholder="Type a message and hit ENTER" />
  </footer>
    );
  }
}

export default ChatBar;
