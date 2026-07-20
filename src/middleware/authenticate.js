import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!sessionId || !accessToken) {
    throw createHttpError('Missing sessions credentials');
  }

  const session = await Session.findOne({ _id: sessionId, accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = session.accessTokenValidUntil < new Date();

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const user = await User.findOne({ _id: session.userId });

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;

  next();
};
