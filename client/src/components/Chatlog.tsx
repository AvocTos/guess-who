import React from 'react';

const Chatlog = ({ log }: ChatlogProps) => {
  return (
    <div className="chatlog">
      {log.map((element: string, index: number) => (
        <p className="chatlog__message" key={index}>{element}</p>
      ))}
    </div>
  );
};

export default Chatlog;
