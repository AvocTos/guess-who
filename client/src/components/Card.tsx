const Card = ({person}: CardProps) => {
  return (
    <div className="card">
      <h1>I'm the card</h1>
      <img src={require(`../player-images/${person.image}`)} />
      <p>{person.name}</p>
    </div>
  );
}

export default Card;