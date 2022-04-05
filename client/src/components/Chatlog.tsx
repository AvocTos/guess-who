import React from 'react';

const Chatlog = ({ log }: ChatlogProps) => (
  <div className="chatlog">
    {log.map((element: string, index: number) => (
      <div className="chat-container" key={index}>
        <p className="chat-container__message">{element}</p>
      </div>
    ))}
  </div>
);

export default Chatlog;
