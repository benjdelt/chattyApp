import React, {Component} from 'react';
import NavBar from './Navbar.jsx';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MessageList />
        <ChatBar /> 
      </div>
    );
  }
} 
export default App;
