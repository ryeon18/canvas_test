import React from 'react';
import {useRef, useEffect, useState, useReducer} from 'react';
import {
    GlassMagnifier,
    Magnifier,
    MagnifierContainer,
    MagnifierPreview,
    MagnifierZoom,
    PictureInPictureMagnifier,
} from 'react-image-magnifiers';

import html2canvas from 'html2canvas';

import disney1 from '../assets/animation1.png';

import Zoom from './components/zoom';

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

    const [scale, setScale] = useState(1);
    const [panning, setPanning] = useState(false);
    const [pointX, setPoinX] = useState(0);
    const [pointY, setPoinY] = useState(0);
    const [start, setStart] = useState({x: 0, y: 0});
    const zoom = document.getElementById('zoom');

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

    const initialState = {
        previewHorizontalPos: 'left',
        previewVerticalPos: 'bottom',
        previewSizePercentage: 35,
        previewOpacity: 1,
        shadow: false,
        show: true,
    };

    const image = 'https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg';

    const imageBox = [disney1];

    function imageViewerReducer(state, action) {
        switch (action.type) {
            case 'POS_UPDATE':
                return {...state, [action.payload.key]: action.payload.value};
            case 'SHADOW_UPDATE':
                return {...state, shadow: action.payload};
            case 'SIZE_UPDATE':
                return {...state, previewSizePercentage: action.payload};
            case 'OPACITY_UPDATE':
                return {...state, previewOpacity: action.payload};
            case 'SHOW_UPDATE':
                return {...state, show: action.payload};
            default:
                return state;
        }
    }

    const [imageState, imageDispatch] = useReducer(imageViewerReducer, initialState);
    const show = (value = true) => {
        // this.setState(() => ({ show: true }));
        imageDispatch({type: 'SHOW_UPDATE', payload: value});
    };

    const handlePosChange = (e, key) => {
        const value = e.target.value;
        // this.setState(() => ({ [key]: value, show: false }), this.show);
        imageDispatch({type: 'POS_UPDATE', payload: {key, value}});
        show(false);
    };

    const handleShadowChange = e => {
        const value = Boolean(e.target.value);
        // this.setState(() => ({ shadow: value }));
        imageDispatch({type: 'SHADOW_UPDATE', payload: value});
    };

    const handleSizeChange = e => {
        const value = Number(e.target.value);
        // this.setState(
        //   () => ({ previewSizePercentage: value, show: false }),
        //   this.show
        // );
        imageDispatch({type: 'SIZE_UPDATE', payload: value});
        show(false);
    };

    const handleOpacityChange = e => {
        const value = Number(e.target.value);
        // this.setState(() => ({ previewOpacity: value }));
        imageDispatch({type: 'OPACITY_UPDATE', payload: value});
    };

    function takeshot() {
        let div = document.getElementById('photo');

        // Use the html2canvas
        // function to take a screenshot
        // and append it
        // to the output div

        html2canvas(div).then(function (canvas) {
            document.getElementById('output').appendChild(canvas);
        });

        // 캡쳐 후 자동저장
        // html2canvas(document.querySelector('.specific'), {
        //     onrendered: function (canvas) {
        //         // document.body.appendChild(canvas);
        //         return Canvas2Image.saveAsPNG(canvas);
        //     },
        // });
    }

    return (
        <div className="container">
            <div>
                <h2> 이미지 줌아웃 </h2>
                {imageBox.map((item, index) => {
                    return <Zoom image={item} key={index} />;
                })}
                <Zoom image={disney1} />;
                <div className="zoom-container">
                    <div className="zoom_outer">
                        <div
                            id="zoom"
                            onMouseDown={e => setMouseDown(e)}
                            onMouseUp={e => setMouseUp(e)}
                            onMouseLeave={e => setMouseMove(e)}
                            onWheel={e => setMouseWheel(e)}
                        >
                            <img src={image} alt="zoom" />
                        </div>
                    </div>
                    <div className="zoom_outer">
                        <div
                            id="zoom"
                            onMouseDown={e => setMouseDown(e)}
                            onMouseUp={e => setMouseUp(e)}
                            onMouseLeave={e => setMouseMove(e)}
                            onWheel={e => setMouseWheel(e)}
                        >
                            <img src={image} alt="zoom" />
                        </div>
                    </div>
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
            <h2> 이미지 프리뷰 </h2>
            <div className="App">
                {imageState.show ? (
                    <PictureInPictureMagnifier
                        className="input-position"
                        imageSrc={image}
                        largeImageSrc={image}
                        previewHorizontalPos={imageState.previewHorizontalPos}
                        previewVerticalPos={imageState.previewVerticalPos}
                        previewSizePercentage={imageState.previewSizePercentage}
                        previewOpacity={imageState.previewOpacity}
                        shadow={imageState.shadow}
                    />
                ) : null}
                <PictureExampleControls
                    handlePosChange={handlePosChange}
                    handleShadowChange={handleShadowChange}
                    handleSizeChange={handleSizeChange}
                    handleOpacityChange={handleOpacityChange}
                />
            </div>
            <div id="photo">
                <h1>GeeksforGeeks</h1>
                Hello everyone! This is a trial page for taking a screenshot. This is a dummy button!
                <button> Dummy</button>
                Click the button below to take a screenshot of the div.
            </div>
            <button onClick={e => takeshot(e)}>Take Screenshot</button>
            <h1>Screenshot:</h1>
            <div id="output"></div>
        </div>
    );

    function PictureExampleControls({handlePosChange, handleShadowChange, handleSizeChange, handleOpacityChange}) {
        return (
            <div className="controls">
                <div className="label-flex">
                    <label className="label-left">
                        Horizontal Align:
                        <select onChange={e => handlePosChange(e, 'previewHorizontalPos')}>
                            <option>left</option>
                            <option>right</option>
                        </select>
                    </label>
                    <label className="label-right">
                        Vertical Align:
                        <select onChange={e => handlePosChange(e, 'previewVerticalPos')}>
                            <option>bottom</option>
                            <option>top</option>
                        </select>
                    </label>
                </div>
                <div className="label-flex">
                    <label className="label-left">
                        Preview Size (%):
                        <select defaultValue="35" onChange={handleSizeChange}>
                            <option>25</option>
                            <option>30</option>
                            <option>35</option>
                            <option>40</option>
                            <option>45</option>
                            <option>50</option>
                        </select>
                    </label>
                    <label className="label-right">
                        Preview Shadow:
                        <select onChange={handleShadowChange}>
                            <option value="">false</option>
                            <option value="true">true</option>
                        </select>
                    </label>
                </div>
                <label className="label">
                    Preview Opacity:
                    <select defaultValue="1" onChange={handleOpacityChange}>
                        <option>0</option>
                        <option>.1</option>
                        <option>.2</option>
                        <option>.3</option>
                        <option>.4</option>
                        <option>.5</option>
                        <option>.6</option>
                        <option>.7</option>
                        <option>.8</option>
                        <option>.9</option>
                        <option>1</option>
                    </select>
                </label>
            </div>
        );
    }
};

export default Home;
