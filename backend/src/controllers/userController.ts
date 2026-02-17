import type { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { sendSuccess } from '../utils/http.js';

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return sendSuccess(res, 200, 'Profile fetched successfully', user);
  } catch (error) {
    return next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user?.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(409).json({ success: false, message: 'Email already in use' });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    return sendSuccess(res, 200, 'Profile updated successfully', {
      id: user._id,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    return next(error);
  }
};
