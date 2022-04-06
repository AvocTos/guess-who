import React from 'react';

const LogoSpinner = () => {
  const diameter = 100;
  const speed = 70000;
  const str = 'Guess who! - by the fams - ';
  const spin = 7;
  const fontAdjustment = 0;
  const container = document.querySelector('.container') || document.createElement('div');

  const containerStyles = {
    height: `${diameter}px`,
    width: `${diameter}px`,
    animationDuration: `${speed}ms`,
  };

  const charactersArray = str.split('');
  const degreesPerLetter = Math.floor(360 / charactersArray.length);
  const calculatedFontSize = (Math.floor((diameter * Math.PI) / charactersArray.length));
  const pct = (20 / 100) * diameter;
  const fontSize = calculatedFontSize > pct ? pct : calculatedFontSize + fontAdjustment;
  const radius = diameter / 2;

  charactersArray.forEach((letter, index) => {
    const newSpan = document.createElement('span');
    const degrees = (index - spin) * degreesPerLetter;
    const styles = {
      transform: `rotate(${degrees}deg)`,
      fontSize: `${fontSize}px`,
      width: `${fontSize}px`,
      height: `${radius}px`,
      marginBottom: `${radius}px`,
    };
    newSpan.innerText = letter;
    newSpan.className = `char${index}`;
    Object.assign(newSpan.style, styles);
    container.appendChild(newSpan);
  });

  return (
    <div className="container" style={containerStyles}></div>
  );
};

export default LogoSpinner;
