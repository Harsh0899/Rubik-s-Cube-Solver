import "./Cube.css";

const Cube = (props) => {
    
    const handleTileClick = (index) => {
        if(props.currentColor !== null) {
          props.onTileClick(index);
        }
    }

    return (
        <div className="cubeface">
            {props.cubeColors.map((color, index) => (
                <div key={index} className="card" style={{
                    background: color
                    }}
                    onClick={() => handleTileClick(index)}
                />
            ))}
            {props.children}
      </div>
    );
}

export default Cube;