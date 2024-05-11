import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    // Using a single state hook for all form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        ConfirmPassword: ''
    });
    const navigate = useNavigate();

    // Handles form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { firstName, lastName, username, email, password, ConfirmPassword } = formData;

        if (password !== ConfirmPassword) {
            console.log(password, "pss", ConfirmPassword, "Confirm")
            alert("Passwords do not match.");
            return;
        } 

        // Prepare user data
        const userData = {
          firstName, 
          lastName,
            username,
            email,
            password,
            ConfirmPassword
        };

        try {
            const response = await axios.post('http://localhost:3000/api/register', userData);
            console.log('Server response:', response.data);

            navigate('/signin');
        } catch (error) {
            console.error('Failed to register:', error);
            alert('Signup failed! ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />

                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="ConfirmPassword" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleChange} />

                <button type="submit">Sign Up</button>
                <Link to="/signin">Already have an account? Sign in here!</Link>
            </form>
        </div>
    );
}

export default SignUp;
