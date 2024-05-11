let gridState = new Array(60).fill(false);

exports.getGridState = (req, res) => {
    res.json(gridState);
};

//  update state api
exports.updateGridState = (req, res) => {
    const { squares: newSquares } = req.body;
    if (newSquares.every(s => s === true)) {
        // If all squares are white, reset them to black
        squares = new Array(60).fill(false);
        res.json({ message: "All squares were white, reset to black.", squares });
    } else {
        // Update the state with the new array
        squares = [...newSquares];
        res.json({ message: "State updated.", squares });
    }
}

