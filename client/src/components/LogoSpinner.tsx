import React from "react";

const LogoSpinner = () => {
  const diameter = 100;
  const speed = 70000;
  const str = "Guess who! - by the fams - ";
  const spin = 7;
  const fontAdjustment = 0;
  const container = document.querySelector('.container')|| document.createElement('div');

  const containerStyles = {
    "height": `${diameter}px`,
    "width": `${diameter}px`,
    "animation-duration": `${speed}ms`
  }

  const charactersArray = str.split('');
  const degreesPerLetter = Math.floor(360 / charactersArray.length);
  const calculatedFontSize = (Math.floor((diameter * Math.PI) / charactersArray.length));
  const percentage = (20 / 100) * diameter;
  const fontSize = calculatedFontSize > percentage ? percentage : calculatedFontSize + fontAdjustment;
  const radius = diameter / 2;

  charactersArray.forEach((letter, index) => {
    const newSpan = document.createElement("span");
    const degrees = (index - spin) * degreesPerLetter;
    var styles = {
      "transform": `rotate(${degrees}deg)`,
      "font-size": `${fontSize}px`,
      "width": `${fontSize}px`,
      "height": `${radius}px`,
      "margin-bottom": `${radius}px`,
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