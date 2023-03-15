import { Response } from 'express';
import { RequestPlus, TokenPayload } from '../domain/interface.js';
import { Auth } from './auth.js';
import { Interceptors } from './interceptor.js';

jest.mock('./auth.js');
jest.mock('./../../config.js', () => ({
  config: {
    secret: 'test',
  },
}));

const req = {
  get: jest.fn(),
  info: {
    role: '',
  } as TokenPayload,
} as unknown as RequestPlus;

const resp = {} as unknown as Response;
const next = jest.fn();

describe('Given the Interceptor class', () => {
  const interceptor = new Interceptors();
  describe('When the logged method is called', () => {
    describe('When called with the correct parameters', () => {
      test('Then the next function should be called', () => {
        (req.get as jest.Mock).mockReturnValue('Bearer test');
        (Auth.verifyJWT as jest.Mock).mockResolvedValue({
          id: 'Test',
        } as TokenPayload);
        interceptor.logged(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });
    describe('When called with no Authorization header', () => {
      test('Then it should call next function (error)', () => {
        (req.get as jest.Mock).mockReturnValue(undefined);

        interceptor.logged(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });
    describe('When called with no bearer', () => {
      test('Then it should call next function (error)', () => {
        (req.get as jest.Mock).mockReturnValue('test');

        interceptor.logged(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});

describe('Given the authorized interceptor', () => {
  const interceptor = new Interceptors();
  describe('When called with no req.info', () => {
    test('Then it should call next function (error)', () => {
      req.info = undefined;

      interceptor.authorized(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When called with no req.info and role is fan', () => {
    test('Then it should call next function (error)', () => {
      req.info = { role: 'fan' } as unknown as TokenPayload;

      interceptor.authorized(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When called with req.info and role is != fan', () => {
    test('Then it should call next function', () => {
      req.info = { role: 'test' } as unknown as TokenPayload;

      interceptor.authorized(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
