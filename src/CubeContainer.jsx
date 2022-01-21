import { useState } from "react";
import solver from "rubiks-cube-solver";
import Cube from "./Components/Cube";
import Face from "./Components/Face";
import Palette from "./Components/Palette";

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

  const faces = {
    'f': '#595260',
    'r': '#595260',
    'u': '#595260',
    'd': '#595260',
    'l': '#595260',
    'b': '#595260'
  };

  const updateFaceColor = (key) => {
    setCubeFace((prevState) => {
      prevState[key]=currentColor;
      return prevState;
    });
    setCurrentColor(null);
  }
 
  const handleDoneFaces = () => {
    setIsFacePending(false);
    setCurrentColor(null);
  }

  const updateCubeColor = (index) => {
    setCubeColors((prevState) => {
      prevState[index]=currentColor;
      return prevState;
    });
    setCurrentColor(null);
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

  const updateCurrentColor = (color) => {
    setCurrentColor(color);
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
      {isFacePending && <Face cubeFace={cubeFace} onFaceClick={updateFaceColor}>
        <button onClick={handleDoneFaces}>Done</button>
      </Face>}
      {!isFacePending && <Cube currentColor={currentColor} cubeColors={cubeColors} onTileClick={updateCubeColor} >
        {isAllFacePending !== 0 ? <button onClick={handleNextFace}>Next Face</button> : null}
        {!isAllFacePending && <button onClick={handleShowSoln}>Show Solution</button>}
      </Cube>}
      <Palette onSelectColor={updateCurrentColor} currentColor={currentColor}/>
    </div>
  );
}

export default CubeContainer;
