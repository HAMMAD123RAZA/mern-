// src/controllers/authController.js
import { User } from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'secretKey'; 

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.json('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPassword });
  const token=  jwt.sign({id:newUser._id,email:newUser.email},JWT_SECRET,{expiresIn:'1h'})
    res.json({ message: 'User created', data: newUser ,token});

  } catch (error) {
    console.log('Error in signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json('User does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ message: 'Password incorrect' });
    }
    const token=  jwt.sign({id:user._id,email:user.email},JWT_SECRET,{expiresIn:'1h'})

    res.json({ message: 'User logged in',token });

  } catch (error) {
    console.log('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};