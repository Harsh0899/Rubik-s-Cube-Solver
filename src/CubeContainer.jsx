import { useState } from "react";
import solver from "rubiks-cube-solver";

function CubeContainer() {
  const cubeTile = [
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
  const faces = {
    'f': '#595260',
    'r': '#595260',
    'u': '#595260',
    'd': '#595260',
    'l': '#595260',
    'b': '#595260'
  };

  const handleFaceClick = (key) => {
    if(currentColor !== null) {
      cubeFace[key] = currentColor;
      setCubeFace(cubeFace);
      setCurrentColor(null);
    }
  }
 
  const handleDoneFaces = () => {
    setIsFacePending(false);
    setCurrentColor(null);
  }

  const handleTileClick = (index) => {
    if(currentColor !== null) {
      cubeColors[index] = currentColor;
      setCubeColors(cubeColors);
      setCurrentColor(null);
    }
  }

  const getKeyByValue = (object, array) => {
    let arr = array.map((color) => (
        Object.keys(object).find(key => object[key] === color)
      ));
    const str = arr.join('');
    return str;
  }

  const handleNextFace = () => {
    const faceString = getKeyByValue(cubeFace, cubeColors);
    setCubeState([...cubeState, faceString]);
    setCubeColors(cubeTile);
    setIsAllFacePending(isAllFacePending-1);
  }

  const handleShowSoln = () => {
    const finalStateString = cubeState.join('');
    console.log(solver(finalStateString));
  }

  const [currentColor, setCurrentColor] = useState(null);                                     // CURRENT PALETTE COLOR SELECTED
  const [cubeColors, setCubeColors] = useState(cubeTile);                                     // CURRENT CUBE FACE COLORS
  const [cubeFace, setCubeFace] = useState(faces);                                            // FACE ASSIGNMENT
  const [isFacePending, setIsFacePending] = useState(true);                                   // IS FACE ASSIGNMENT DONE
  const [isAllFacePending, setIsAllFacePending] = useState(6);                                // ARE ALL FACE COLORS DONE
  const [cubeState, setCubeState] = useState([]);                                             // FINAL CUBE STATE
 

  return (
    <div className="main-container">
      {/********** Selecting FACES of the cube **********/}
      {isFacePending && <div className="faces">
        {Object.keys(cubeFace).map((key, index) => (
          <div 
            key={index} 
            className="card" 
            style={{
              background: cubeFace[key]
            }}
            onClick={() => handleFaceClick(key)}
          >
            <p>{key}</p>
          </div>
        ))}
        <button onClick={handleDoneFaces}>Done</button>
      </div>}

      {/********** Selecting COLORS of the cube **********/}
      {!isFacePending && <div className="cubeface">
        {cubeColors.map((color, index) => (
          <div key={index} className="card" style={{
              background: color
            }}
            onClick={() => handleTileClick(index)}
          />
        ))}
        {isAllFacePending !== 0 ? <button onClick={handleNextFace}>Next Face</button> : null}
        {!isAllFacePending && <button onClick={handleShowSoln}>Show Solution</button>}
      </div>}

      {/********** COLOR PALETTE **********/}
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
