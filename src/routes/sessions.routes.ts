import { Router } from 'express';
import CreateSessionService from '../service/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUser = new CreateSessionService();

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
