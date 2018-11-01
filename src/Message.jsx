import React, {Component} from 'react';

class Message extends Component {
  render() {
  
console.log(this.props.message)

      if (this.props.message.type === "notification") {
      return ( <div class="notification">
  <span class="notification-content"></span>
      </div> )

    
      }else if (this.props.message.type === "message"){
        return (
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
      
          );
    


  }
}
}

export default Message;