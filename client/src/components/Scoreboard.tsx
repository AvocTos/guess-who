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
    <div className="scoreboard">
      <h3 className="scoreboard__title">Top 5 scores:</h3>
      <ul className="scoreboard__list">
        {scoreboardList.map((person, index: number) => {
          return (

              <li key={index} className="scoreboard__item">
                {person.username}: {person.score}
              </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Scoreboard;
