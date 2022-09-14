import React from 'react';
import {useRef, useEffect, useState} from 'react';
import disney1 from '../assets/animation1.png';

const Home = () => {
    // useRef
    const canvasRef = useRef(null);
    // getCtx
    const [getCtx, setGetCtx] = useState(null);
    // painting state
    const [painting, setPainting] = useState(false);

    useEffect(() => {
        // canvas useRef
        const canvas = canvasRef.current;
        canvas.width = 650;
        canvas.height = 540;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
        setGetCtx(ctx);
    }, []);

    const drawFn = e => {
        // mouse position
        const mouseX = e.nativeEvent.offsetX;
        const mouseY = e.nativeEvent.offsetY;
        // drawing
        if (!painting) {
            getCtx.beginPath();
            getCtx.moveTo(mouseX, mouseY);
        } else {
            getCtx.lineTo(mouseX, mouseY);
            getCtx.stroke();
        }
    };

    var scale = 1;
    var panning = false;
    var pointX = 0;
    var pointY = 0;
    var start = {x: 0, y: 0};
    var zoom = document.getElementById('zoom');

    function setTransform() {
        console.log('setTransForm');

        zoom.style.transform = 'translate(' + pointX + 'px, ' + pointY + 'px) scale(' + scale + ')';
    }

    function setMouseDown(e) {
        e.preventDefault();
        console.log('setMouseDown');
        start = {x: e.clientX - pointX, y: e.clientY - pointY};
        panning = true;
    }

    function setMouseUp(e) {
        e.preventDefault();
        panning = false;
        console.log('setMouseUp');
    }

    function setMouseMove(e) {
        e.preventDefault();
        console.log('setMouseMove');
        if (!panning) {
            return;
        }
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;
        setTransform();
    }

    function setMouseWheel(e) {
        e.preventDefault();
        console.log('setMouseWheel');
        var xs = (e.clientX - pointX) / scale,
            ys = (e.clientY - pointY) / scale,
            delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
        delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;

        setTransform();
    }

    return (
        <div>
            <h2> 이미지 줌아웃 </h2>
            <div className="zoom_outer" width={'300px'}>
                <div
                    id="zoom"
                    onMouseDown={e => setMouseDown(e)}
                    onMouseUp={e => setMouseUp(e)}
                    onMouseLeave={e => setMouseMove(e)}
                    onWheel={e => setMouseWheel(e)}
                >
                    <img src={disney1} alt="zoom" />
                </div>
            </div>
            <h2> 브러쉬 </h2>
            <div className="view" style={{backgroundColor: 'beige'}}>
                <div className="canvasWrap">
                    <canvas
                        className="canvas"
                        ref={canvasRef}
                        onMouseDown={() => setPainting(true)}
                        onMouseUp={() => setPainting(false)}
                        onMouseMove={e => drawFn(e)}
                        onMouseLeave={() => setPainting(false)}
                    ></canvas>
                </div>
            </div>
        </div>
    );
};

export default Home;
