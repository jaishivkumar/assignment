import React, { useState, useEffect } from 'react';
import './Grid.css';

function Grid() {
    // Initializes an array of 60 false values (representing black squares).
    const [squares, setSquares] = useState(new Array(60).fill(false));

    useEffect(() => {
        const interval = setInterval(() => {
            // Check if all squares are white
            if (squares.every(s => s === true)) {
                // Resets all squares to black (false)
                setSquares(new Array(60).fill(false));
            } else {
                // Continues to randomly turn a black square white until all are white
                setSquares(prevSquares => {
                    let newSquares = [...prevSquares];
                    let availableIndices = newSquares
                        .map((s, index) => s === false ? index : null)
                        .filter(index => index !== null);

                    if (availableIndices.length > 0) {
                        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                        newSquares[randomIndex] = true;
                    }

                    return newSquares;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [squares]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '500px' }}> {/* Updated width */}
            {squares.map((isWhite, index) => (
                <div key={index} style={{
                    width: '50px', // Each square width
                    height: '50px', // Each square height
                    backgroundColor: isWhite ? 'white' : 'black',
                    border: '1px solid gray',
                    boxSizing: 'border-box'
                }} />
            ))}
        </div>
    );
}

export default Grid;
