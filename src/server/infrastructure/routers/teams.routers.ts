import { Router } from 'express';
import { Interceptors } from '../../application/interceptor.js';
import { HTTPError } from '../../../common/error.js';
import { Auth } from '../../application/auth.js';
import ServerRouter from '../../server.router.interface.js';
import { TokenPayload } from '../../domain/interface.js';
import UserDestroyer from '../../../users/application/user.destroyer.js';
import UserFinder from '../../../users/application/user.finder.js';
import UserLogin from '../../../users/application/user.login.js';
import UserRegister from '../../../users/application/user.register.js';
import UserUpdater from '../../../users/application/user.updater.js';
import TeamCreateMany from '../../../teams/application/team.create.many.js';
import TeamCreator from '../../../teams/application/team.creator.js';

export default class TeamRouter implements ServerRouter {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  path: string = '/teams';
  interceptor: Interceptors = new Interceptors();
  router: Router = Router();

  constructor(
    private teamCreateMany: TeamCreateMany,
    private teamCreator: TeamCreator,
    private userRegister: UserRegister,
    private userLogin: UserLogin,
    private userFinder: UserFinder,
    private userUpdater: UserUpdater,
    private userDestroyer: UserDestroyer
  ) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.get(`/:id`, async (req, res, _next) => {
      const { id } = req.params;
      const response = await this.userFinder.execute(id);

      res.status(200).json(response);
    });

    this.router.post('/many', async (req, res, next) => {
      try {
        const data = await this.teamCreateMany.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post('/create', async (req, res, next) => {
      try {
        const data = await this.teamCreator.execute(req.body);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/register', async (req, res, next) => {
      try {
        const { body } = req;

        if (
          !req.body.email ||
          !req.body.password ||
          !req.body.name ||
          !req.body.surname
        )
          throw new HTTPError(
            401,
            'Unauthorized',
            'Invalid Name, Email or password'
          );

        req.body.password = await Auth.hash(req.body.password);

        req.body.role = 'fan';

        const data = await this.userRegister.execute(body);

        res.status(201);
        res.json({
          results: [data],
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/login', async (req, res, next) => {
      try {
        if (!req.body.email || !req.body.password)
          throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');

        const data = await this.userLogin.execute({
          key: 'email',
          value: req.body.email,
        });

        if (!data.length)
          throw new HTTPError(401, 'Unauthorized', 'username not found');

        if (!(await Auth.compare(req.body.password, data[0].password)))
          throw new HTTPError(401, 'Unauthorized', 'Password not match');

        const payload: TokenPayload = {
          id: data[0].id,
          email: data[0].email,
          role: 'Admin',
        };

        const token = Auth.createJWT(payload);
        res.status(202);
        res.json({
          results: {
            token,
          },
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get('/:id', this.interceptor.logged, async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await this.userFinder.execute(id);

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

    this.router.put('/:id', this.interceptor.logged, async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body } = req;

        const newUser = {
          id,
          ...body,
        };

        await this.userUpdater.execute(newUser);

        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });

    this.router.delete(
      '/:id',
      this.interceptor.logged,
      async (req, res, next) => {
        try {
          const { id } = req.params;

          await this.userDestroyer.execute(id);

          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
