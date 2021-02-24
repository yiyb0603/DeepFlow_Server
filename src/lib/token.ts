import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import getProcessEnv from './getProcessEnv';

const JWT_SECRET: string = getProcessEnv('JWT_SECRET');

export const createToken = (id: string) => {
	const payload = {
		id,
	};

	const options: SignOptions = {
		expiresIn: '30d',
	};

	return jwt.sign(payload, JWT_SECRET, options);
};

export const decodeToken = (token: string) => {
	return jwt.decode(token);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET);
};
