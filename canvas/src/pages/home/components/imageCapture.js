import React from 'react';
import html2canvas from 'html2canvas';

const ImageCapture = () => {
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
        <>
            <div id="photo">
                <h1>GeeksforGeeks</h1>
                Hello everyone! This is a trial page for taking a screenshot. This is a dummy button!
                <button> Dummy</button>
                Click the button below to take a screenshot of the div.
            </div>
            <button onClick={e => takeshot(e)}>Take Screenshot</button>
            <h1>Screenshot:</h1>
            <div id="output"></div>
        </>
    );
};

export default ImageCapture;
