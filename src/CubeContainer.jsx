import { useState } from "react";

function CubeContainer() {
  const cubeFace = [
    '#595260',
    '#595260',
    '#595260',
    '#595260',
    '#595260',
    '#595260',
    '#595260',
    '#595260',
    '#595260'
  ];
  const colors = [
    '#CD113B',
    '#FFE227',
    '#0F2C67',
    '#F98404',
    '#FCECDD',
    '#95CD41'
  ];

  const handleBoxClick = (index) => {
    if(currentColor !== null) {
      cubeColors[index] = currentColor;
      setCubeColors(cubeColors);
      setCurrentColor(null);
    }
  }

  const [currentColor, setCurrentColor] = useState(null);
  const [cubeColors, setCubeColors] = useState(cubeFace);

  return (
    <div className="main-container">
      <div className="cubeface">
        {cubeColors.map((color, index) => (
          <div key={index} className="card" style={{
              background: color
            }}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      <div className="palette">
        {colors.map((color, index) => (
          <div key={index} className="card" style={{
              background: color,
              boxShadow: color === currentColor ? "0 0 5px #000" : "",
            }}
            onClick={() => setCurrentColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default CubeContainer;
