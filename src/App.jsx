import React, {Component} from 'react';
import NavBar from './Navbar.jsx';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
// import { url } from 'inspector';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      receivedMessages: [],
      numberOfUsers: 0,
      color: "black",
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage = (username, message, type) => {
    const newMessage = {
      id: "",
      type: type,
      content: message,
      username: username,
      color: this.state.color,
    }
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({
      messages: newMessages,
      currentUser: newMessage.username,
    });
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 8, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
    //   const messages = this.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    
    const HOST = "localhost";
    const PORT = 3001;
    this.socket = new WebSocket(`ws://${HOST}:${PORT}`);
    this.socket.onerror = ((evt) => {
      console.error("Connection error:", evt);
    })
    this.socket.onopen = ((evt) => {
      console.log("Connected to server");

      this.socket.onmessage =  ((evt) => {
        let newMessage = JSON.parse(evt.data);

        if(newMessage.id) {
          const oldReceivedMessages = this.state.receivedMessages;
          const newReceivedMessages = [...oldReceivedMessages, newMessage];
          this.setState({receivedMessages: newReceivedMessages}); 
        } else if (newMessage.numberOfUsers) {
          this.setState({numberOfUsers: newMessage.numberOfUsers});
        } else {
          this.setState({color: newMessage.color})
        }
      })
     
    });
  }
  

  render() {
    return (
      <div>
        <NavBar numberOfUsers={this.state.numberOfUsers}/>
        <MessageList messages={this.state.receivedMessages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/> 
      </div>
    );
  }
} 
export default App;
