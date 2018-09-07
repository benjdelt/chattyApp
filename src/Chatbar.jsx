import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oldUser: this.props.currenUser,
      currentUser: this.props.currentUser,
    }
  }

  handleChange = (evt) => {
    this.setState({currentUser: evt.target.value});
  }
  
  onSubmitUser = (evt) => {
    evt.preventDefault();
    if(!this.state.currentUser){
      this.setState({currentUser: "Anonymous"});
    }
    this.props.addMessage(this.state.currentUser, `${this.state.oldUser || "Anonymous"} changed their name to ${this.state.currentUser || "Anonymous"}`, "incomingNotification");
  }

  onSubmitMessage = (evt) => {
    evt.preventDefault();
    let username = this.state.currentUser;
    this.setState({oldUser: username});
    let message = evt.target.elements.chatbarMessage;
    this.props.addMessage(username, message.value, "incomingMessage");
    message.value = "";

  } 

  render() {
    return (
        <footer className="chatbar">

          <form onSubmit={this.onSubmitUser}>
        
            <input className="chatbar-username"
            value={this.state.currentUser} 
            onChange={this.handleChange}
            placeholder={this.state.currentUser}
            name="chatbarUsername"
            />
            <input className="submit" type="submit" />
          </form>

          <form onSubmit={this.onSubmitMessage}>
            <input 
            className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
            name="chatbarMessage" 
            />
            <input className="submit" type="submit"/>
          </form>
        </footer>
    );
  }
} 
export default ChatBar;
