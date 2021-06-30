import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Recebe o token
  const authToken = request.headers.authorization;

  //valida se o token esta preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    // valida o token
    const { sub } = verify(
      token,
      '2c11f6c9572711d8138ae182e6be276b'
    ) as IPayload;

    // Recupar as info do usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
