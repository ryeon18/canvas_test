import React from 'react';

const Brush = ({truePainting, falsePainting, drawFn, canvasRef}) => {
    return (
        <>
            <h2> 브러쉬 </h2>
            <div className="view" style={{backgroundColor: 'beige'}}>
                <div className="canvasWrap">
                    <canvas
                        className="canvas"
                        onMouseDown={truePainting()}
                        onMouseUp={falsePainting()}
                        onMouseMove={e => drawFn(e)}
                        onMouseLeave={falsePainting()}
                        ref={canvasRef}
                    ></canvas>
                </div>
            </div>
        </>
    );
};

export default Brush;
