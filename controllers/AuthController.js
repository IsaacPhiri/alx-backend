import { RedisClient } from '../utils/redis.js';
import { dbClient } from '../utils/db.js';
import { v4 as uuidv4 } from 'uuid';

const AuthController = {
  async getConnect(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const encodedCredentials = authHeader.replace('Basic ', '');
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');

    const user = await dbClient.getUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = uuidv4();
    const key = `auth_${token}`;
    await RedisClient.set(key, user._id.toString(), 'EX', 24 * 60 * 60); // Expire in 24 hours

    res.status(200).json({ token });
  },

  async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await RedisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await RedisClient.del(key);
    res.sendStatus(204);
  },
};

export default AuthController;
