import { Router } from 'express';
import { signup } from './signup.controller';
import { login } from './login.controller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;

import { authenticate } from './middlewares/auth.js';

router.get('/protected-route', authenticate, (req, res) => {
  res.json({ message: 'Authenticated access' });
});