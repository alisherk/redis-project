import { randomBytes } from 'crypto';

export const genId = () => randomBytes(3).toString('hex');
