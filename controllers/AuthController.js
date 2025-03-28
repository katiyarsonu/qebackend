// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const register = async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     user = new User({ email, password, firstName, lastName });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const getMe = async (req, res) => {
//   res.json({ user: req.user });
// };

// module.exports = { register, login, getMe };


const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const { validateRegisterInput } = require('../utils/validators');
const { sendEmail } = require('../services/emailService');

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const errors = validateRegisterInput({ email, password, firstName, lastName });
  if (errors.length > 0) return res.status(400).json({ message: errors });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ email, password, firstName, lastName });
    await user.save();

    const token = generateToken(user._id);

    await sendEmail({
      to: email,
      subject: 'Welcome to Resume Builder',
      text: `Hi ${firstName}, welcome to Resume Builder!`,
      html: `<p>Hi ${firstName}, welcome to Resume Builder!</p>`,
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, getMe };