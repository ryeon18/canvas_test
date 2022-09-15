import React from 'react';

import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';

const Zoom = ({image}) => {
    return (
        <div className="zoom-box">
            <TransformWrapper initialScale={0.3} minScale={0.2} maxScale={10} centerZoomedOut={true}>
                <TransformComponent>
                    <figure>
                        <img src={image} alt="zoom" className="image-in-zoom" />
                    </figure>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default Zoom;
