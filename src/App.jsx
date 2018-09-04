import React, {Component} from 'react';
import NavBar from './Navbar.jsx';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      messages: [
        { id: 1,
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        { id: 2,
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
        },
        { id: 3,
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        { id: 4,
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        { id: 5,
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        { id: 6,
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        { id: 7,
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
        },
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage = (username, message) => {
    const newMessage = {
      id: Math.random(),
      type:"incomingMessage",
      content: message,
      username: username
    }
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({messages: newMessages});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 8, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/> 
      </div>
    );
  }
} 
export default App;
