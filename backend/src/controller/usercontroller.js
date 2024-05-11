const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const query = require('../config/database');

const { contactSchema } = require('../validation/validation');


exports.register = async (req, res) => {
  const { firstName, lastName, username, email, password, ConfirmPassword } = req.body;

  // Validate the request body against schema
  const { error } = contactSchema.validate({ firstName, lastName, username, password, email });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if password and ConfirmPassword match
  if (password !== ConfirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  
  try {
    const results = await query('SELECT username FROM users WHERE username = ?', [username]);

    if (results.length > 0) {
      return res.status(409).send('Username already exists, please choose another one');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Since the password is hashed, there's no need to hash the confirmation password separately.
    const insertResult = await query(
      'INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, username, email, hashedPassword]
    );
    res.status(201).send('User registered');
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send('Error registering user');
  }
};



//login////

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await query('SELECT * FROM users WHERE username = ?', [username]);
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, status:200, msg:'Login sucessfully'});
    } else {
      res.status(401).send('Password does not match');
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send('Login error');
  }
};
