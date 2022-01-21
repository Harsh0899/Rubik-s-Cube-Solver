import "./Face.css"

const Face = (props) => {

    const handleFaceClick = (key) => {
        if(props.currentColor !== null) {
          props.onFaceClick(key);
        }
      }

    return (
        <div className="faces">
            {Object.keys(props.cubeFace).map((key, index) => (
            <div 
                key={index} 
                className="card" 
                style={{
                background: props.cubeFace[key]
                }}
                onClick={() => handleFaceClick(key)}
            >
                <p>{key}</p>
            </div>
            ))}
            {props.children}
        </div>
    );
}

export default Face;