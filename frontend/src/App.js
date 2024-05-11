import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Grid from './components/Grid';

function App() {
    const isAuthenticated = () => localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/grid" element={ <Grid />}/>
                {/* <Route path="/grid" element={isAuthenticated() ? <Grid /> : <Navigate replace to="/signin" />} /> */}
                <Route path="/" element={<Navigate replace to="/signin" />} />
            </Routes>
        </Router>
    );
}

export default App;
