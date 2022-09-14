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
        console.log('setMouseWheel');
        var xs = (e.clientX - pointX) / scale,
            ys = (e.clientY - pointY) / scale,
            delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
        delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;

        setTransform();
    }

    const imgID = document.getElementById('imgID');
    const resultID = document.getElementById('resultID');

    function imageZoom(imgID, resultID) {
        var img, lens, result, cx, cy;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);
        /* Create lens: */
        lens = document.createElement('DIV');
        lens.setAttribute('class', 'img-zoom-lens');
        /* Insert lens: */
        img.parentElement.insertBefore(lens, img);
        /* Calculate the ratio between result DIV and lens: */
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        /* Set background properties for the result DIV */
        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize = img.width * cx + 'px ' + img.height * cy + 'px';
        /* Execute a function when someone moves the cursor over the image, or the lens: */
        lens.addEventListener('mousemove', moveLens);
        img.addEventListener('mousemove', moveLens);
        /* And also for touch screens: */
        lens.addEventListener('touchmove', moveLens);
        img.addEventListener('touchmove', moveLens);
        function moveLens(e) {
            var pos, x, y;
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            pos = getCursorPos(e);
            /* Calculate the position of the lens: */
            x = pos.x - lens.offsetWidth / 2;
            y = pos.y - lens.offsetHeight / 2;
            /* Prevent the lens from being positioned outside the image: */
            if (x > img.width - lens.offsetWidth) {
                x = img.width - lens.offsetWidth;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > img.height - lens.offsetHeight) {
                y = img.height - lens.offsetHeight;
            }
            if (y < 0) {
                y = 0;
            }
            /* Set the position of the lens: */
            lens.style.left = x + 'px';
            lens.style.top = y + 'px';
            /* Display what the lens "sees": */
            result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
        }

        function getCursorPos(e) {
            var a,
                x = 0,
                y = 0;
            e = e || window.event;
            /* Get the x and y positions of the image: */
            a = img.getBoundingClientRect();
            /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {x: x, y: y};
        }
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
            <h2> 이미지 프리뷰 </h2>
            <div className="img-zoom-container">
                <img
                    id="myimage"
                    src={disney1}
                    width="300"
                    height="240"
                    alt="Girl"
                    onMouseOver={() => imageZoom(imgID, resultID)}
                />
                <div id="myresult" className="img-zoom-result"></div>
            </div>
        </div>
    );
};

export default Home;
