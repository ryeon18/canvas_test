import React, {useRef, useMemo, useEffect} from 'react';

const ZoomTest = ({image}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const observer = useRef(null);
    const background = useMemo(() => new Image(), [image]);

    useEffect(() => {
        observer.current = new ResizeObserver(entries => {
            entries.forEach(({target}) => {
                const {width, height} = background;
                if (target.clientWidth < width) {
                    const scale = target.clientWidth / width;

                    canvasRef.current.width = width * scale;
                    canvasRef.current.height = height * scale;
                    canvasRef.current.getContext('2d').drawImage(background, 0, 0, width * scale, height * scale);
                }
            });
        });
        observer.current.observe(containerRef.current);
        return () => observer.current.unobserve(containerRef.current);
    }, []);

    useEffect(() => {
        background.src = image;
        if (canvasRef.current) {
            background.onload = () => {
                const {width, height} = background;
                canvasRef.current.width = width;
                canvasRef.current.height = height;

                canvasRef.current.getContext('2d').drawImage(background, 0, 0);
            };
        }
    }, [background]);

    return (
        <div ref={containerRef}>
            <div ref={canvasRef}>dd</div>
        </div>
    );
};

export default ZoomTest;
