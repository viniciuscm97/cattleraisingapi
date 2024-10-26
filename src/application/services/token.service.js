import jwt from 'jsonwebtoken';
import { ENV } from '../../domain/system/env.js';

export default class TokenService {
    async createJwtToken(userId) {
        return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRATION });
    }
}