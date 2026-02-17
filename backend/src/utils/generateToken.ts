import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] });
};
