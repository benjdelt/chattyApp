import React, {Component} from 'react';

const Notification = ({notification}) => {
  return (
    <div className="message system">{notification.content}</div>
  );
}

export default Notification;
