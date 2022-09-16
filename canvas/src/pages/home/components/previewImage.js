import React, {useReducer} from 'react';

import {
    GlassMagnifier,
    Magnifier,
    MagnifierContainer,
    MagnifierPreview,
    MagnifierZoom,
    PictureInPictureMagnifier,
} from 'react-image-magnifiers';

const PreviewImage = () => {
    const image = 'https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg';

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

    const initialState = {
        previewHorizontalPos: 'left',
        previewVerticalPos: 'bottom',
        previewSizePercentage: 35,
        previewOpacity: 1,
        shadow: false,
        show: true,
    };

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

    return (
        <>
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
            </div>
        </>
    );
};

export default PreviewImage;
