import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import ZoomTest from './pages/zoom';

const Switches = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="zoom" element={<ZoomTest />} />
            </Routes>
        </Router>
    );
};

export default Switches;
