import React from 'react';
import { MDBContainer, MDBAlert } from 'mdbreact';

const Message = ({ type, content }) => {
  return (
    <div>
      <MDBAlert color={type}>{content}</MDBAlert>
    </div>
  );
};

export default Message;
