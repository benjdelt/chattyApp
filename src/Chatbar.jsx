import React, {Component} from 'react';

class ChatBar extends Component {



  onSubmit = (evt) => {
    evt.preventDefault();
    let username = evt.target.elements.chatbarUsername;
    let message = evt.target.elements.chatbarMessage;
    this.props.addMessage(username.value, message.value);
    message.value = "";
    username.value = "";

  } 

  render() {
    return (
        <footer className="chatbar">
          <form onSubmit={this.onSubmit}>
            <input className="chatbar-username" placeholder={this.props.currentUser} name="chatbarUsername"/>
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="chatbarMessage" />
            <input type="submit"/>
          </form>
        </footer>
    );
  }
} 
export default ChatBar;
