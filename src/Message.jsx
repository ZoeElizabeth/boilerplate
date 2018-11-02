import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    //Notification Html parameter
      if (this.props.message.type === 'notification') {
        return ( 
          <div className='notification'>
            <span className='notification-content'>{this.props.message.content}</span>
          </div> );

    //Message Html parameter
      }else if (this.props.message.type === 'message'){
        return (
          <div className='message'>
            <span className='message-username'>{this.props.message.username}</span>
            <span className='message-content'>{this.props.message.content}</span>
          </div>);
      }
  }
}

export default Message;