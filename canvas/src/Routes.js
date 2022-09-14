import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';

const Switches = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default Switches;
