import { useEffect } from 'react';
import Card from './Card';

const salties = [      
  'Abel.jpeg',     'Alejandro.jpeg',
  'Alex H.png',     'Alex S.jpeg',   'Anu.jpeg',
  'Barbara.png',    'Beatrice.jpeg', 'Calle.jpeg',
  'Christina.jpeg', 'David.jpeg',    'Dovlat.png',
  'Erik.jpeg',      'Ersan.jpeg',    'Fabrizio.png',
  'Frans.png',      'Guian.jpeg',    'Isa.jpeg',
  'Isabelle.png',   'Ivan.jpeg',     'Izabela.jpeg',
  'Jimmy.jpeg',     'Joan.png',      'Johan E.jpeg',
  'Johan K.jpeg',   'Johannes.jpeg', 'Josephine.jpeg',
  'Kevin.jpeg',     'Krishna.jpeg',  'Leila.png',
  'Ludwig.jpeg',    'Marina.jpeg',   'Martin.png',
  'Micky.jpeg',     'Natalia.jpeg',  'Nathalie.png',
  'Negar.jpeg',     'Nemanja.jpeg',  'Oscar.jpeg',
  'Patrycja.jpeg',  'Roeline.png',   'Samuel.jpeg',
  'Sandra.png',     'Seyf.jpeg',     'Snehal.jpeg',
  'Sumana.png',     'Syed.jpeg',     'Thomas.png',
  'Tianbiao.jpeg'
];

const Board = () => {
  useEffect(() => {
    // get image object array from backend
    // assign array to store
    // push store to cloud
    
  },[]);
  // ß

  return (
    <div className="board">
      <h1>I'm the board</h1> 
      <section className="">
        {salties.map((person, index: number) => (
          <Card key={index} person={person} />
        ))}
      </section>
    </div>
  );
}

export default Board;