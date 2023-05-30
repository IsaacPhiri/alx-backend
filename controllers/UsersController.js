import { dbClient } from '../utils/db.js';
import crypto from 'crypto';

const UsersController = {
  async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await dbClient.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: 'Already exists' });
    }

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    const newUser = {
      email: email,
      password: hashedPassword
    };

    const result = await dbClient.createUser(newUser);

    res.status(201).json({ id: result.insertedId, email: newUser.email });
  }
};

export default UsersController;
