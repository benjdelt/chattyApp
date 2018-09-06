import React, {Component} from 'react';

const Message = ({message}) => {
  const style = {color: message.color};
  const imageUrlRegEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  const imageUrl = message.content.match(imageUrlRegEx);
  console.log(imageUrl);
  message.content = message.content.replace(imageUrlRegEx, '');
  // console.log("content:", message.content);
  return (
    <div className="message">
      <span className="message-username" style={style}>{message.username}</span>
      <span className="message-content">{message.content}</span>
      {imageUrl ? <img src={imageUrl[0]} /> : ''};
    </div>
  );
}

export default Message;
