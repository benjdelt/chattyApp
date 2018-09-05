import React, {Component} from 'react';

const Message = ({message}) => {
  const style = {color: message.color};
  return (
    <div className="message">
      <span className="message-username" style={style}>{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );
}

export default Message;
