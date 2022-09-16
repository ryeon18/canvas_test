import React from 'react';
import {useRef, useEffect, useState, useReducer, useMemo} from 'react';
import {
    GlassMagnifier,
    Magnifier,
    MagnifierContainer,
    MagnifierPreview,
    MagnifierZoom,
    PictureInPictureMagnifier,
} from 'react-image-magnifiers';

import disney1 from '../../assets/animation1.png';

import Zoom from './components/zoom';

import Brush from './components/brush';
import PreviewImage from './components/previewImage';
import ImageCapture from './components/imageCapture';

import {useHistory, useLocation, useParams, useRouteMatch, Link} from 'react-router-dom';

const Home = () => {
    /********************************************************** 줌 *********************************************/
    // const [scale, setScale] = useState(1);
    // const [panning, setPanning] = useState(false);
    // const [pointX, setPoinX] = useState(0);
    // const [pointY, setPoinY] = useState(0);
    // const [start, setStart] = useState({x: 0, y: 0});
    const zoom = document.getElementById('zoom');

    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let start = {x: 0, y: 0};

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
        var xs = (e.clientX - pointX) / scale,
            ys = (e.clientY - pointY) / scale,
            delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
        delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;

        console.log(delta, e.deltaY, e.wheelDelta);

        setTransform();
    }

    const imageBox = [disney1];

    /********************************************************** 브러쉬 ***********************************************************/
    // useRef
    const canvasRef = useRef(null);
    // getCtx
    const [getCtx, setGetCtx] = useState(null);
    // painting state
    const [painting, setPainting] = useState(false);

    useEffect(() => {
        // canvas useRef
        const canvas = canvasRef.current;
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
        setGetCtx(ctx);
    }, []);

    const truePainting = () => {
        return setPainting(true);
    };

    const falsePainting = () => {
        return setPainting(false);
    };

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

    /************************************************************Zoom test ****************************************************************/

    return (
        <div className="container">
            <Link to="/zoom">ZoomTestPage</Link>
            {/* 이미지 줌아웃  */}
            <div>
                <h2> 이미지 줌아웃 </h2>
                {imageBox.map((item, index) => {
                    return <Zoom image={item} key={index} />;
                })}
                <Zoom image={disney1} />
                {/* <div className="zoom-container">
                    <div className="zoom_outer">
                        <div
                            id="zoom"
                            onMouseDown={e => setMouseDown(e)}
                            onMouseUp={e => setMouseUp(e)}
                            onMouseLeave={e => setMouseMove(e)}
                            onWheel={e => setMouseWheel(e)}
                        >
                            <img src={disney1} alt="zoom" />
                            <img src={disney1} alt="zoom" />
                        </div>
                    </div>
                </div> */}
            </div>
            {/* 브러쉬 */}
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
            {/* <Brush truePainting={truePainting} falsePainting={falsePainting} drawFn={drawFn} canvasRef={canvasRef} /> */}
            {/* 이미지맵  */}
            <PreviewImage />
            {/* 이미지캡쳐  */}
            <ImageCapture />
        </div>
    );
};

export default Home;
