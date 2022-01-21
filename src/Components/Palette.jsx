import "./Palette.css";

const Palette = (props) => {
    const colors = [
        '#CD113B',
        '#FFE227',
        '#0F2C67',
        '#F98404',
        '#FCECDD',
        '#95CD41'
    ];

    return (
        <div className="palette">
            {colors.map((color, index) => (
                <div key={index} className="card" style={{
                    background: color,
                    boxShadow: color === props.currentColor ? "0 0 5px #000" : "",
                    }}
                    onClick={() => props.onSelectColor(color)}
                />
            ))}
        </div>
    )
}

export default Palette;