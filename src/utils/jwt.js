import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';



export const genToken = (payload) => {
    return jwt.sign(payload, config.secret, { expiresIn: '1h' });
}

