const Card = ({person}: CardProps) => {
  return (
    <div className="card">
      <h1>I'm the card</h1>
      <img src={require(`../player-images/${person}`)} />
      <p>{person.split('.')[0]}</p>
    </div>
  );
}

export default Card;