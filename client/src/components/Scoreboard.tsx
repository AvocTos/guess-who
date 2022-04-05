import React, { useEffect, useState } from 'react';

const Scoreboard = () => {
  const [scoreboardList, setScoreboardList] = useState([
    { username: '', score: 0 },
  ]);

  const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

  useEffect(() => {
    fetch(`${address}/api/scoreboard`)
      .then((res) => res.json())
      .then((data) => {
        setScoreboardList(data);
      });
  }, []);

  return (
    <ul className="">
      {scoreboardList.map((person, index: number) => (
        <li key={index}>
          {person.username}
          , points:
          { person.score}
        </li>
      ))}
    </ul>
  );
};

export default Scoreboard;
