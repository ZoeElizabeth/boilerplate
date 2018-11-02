import React, {Component} from 'react';


class ChatBar extends Component {

  //Grab content from input box and send to be rendered
  chatBarContent(event){
    const content = event.target;

      if (event.charCode === 13){
  
        this.props.grabInput(content.value);

        content.value = "";    
      }
  }
  //Grab username content from input box and send to be rendered
  grabName(event){
    const content = event.target;

      if (event.charCode === 13){
  
        this.props.grabName(content.value);
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
