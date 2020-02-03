import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import sessionConfig from '../../config/sessionConf';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ Error: 'Token not found' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decode = await promisify(jwt.verify)(token, sessionConfig.secret);
    req.userId = decode.id;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: 'Inválid Token ' });
  }
};
