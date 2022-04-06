import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chatlog = ({ log }: ChatlogProps) => (
  <div className="chatlog">
    {log.map((element: string) => (
      <p className="chatlog__message" key={uuidv4()}>{element}</p>
    ))}
  </div>
);

export default Chatlog;
