import { RedisClient } from '../utils/redis.js';
import { dbClient } from '../utils/db.js';

const AppController = {
  async getStatus(req, res) {
    const redisStatus = await RedisClient.isAlive();
    const dbStatus = await dbClient.isAlive();

    if (redisStatus && dbStatus) {
      res.status(200).json({ redis: true, db: true });
    } else {
      res.status(500).json({ redis: false, db: false });
    }
  },

  async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    res.status(200).json({ users: usersCount, files: filesCount });
  }
};

export default AppController;
