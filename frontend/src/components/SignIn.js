import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password
            });

            // Check if the response includes the JWT token
            if (response.data.token) {
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('token', response.data.token);
                alert("Login successful!");
                navigate('/grid'); // Navigate to '/grid' upon successful login
            } else {
                alert("Login failed: Incorrect username or password");
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            alert("Login failed: An error occurred.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signin-form">
            <h2>Sign In</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Sign In</button>
            <p>Don't have an account? <Link to="/signup">Sign up here!</Link></p>
        </form>
    );
}

export default SignIn;
