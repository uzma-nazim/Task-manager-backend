import jwt from "jsonwebtoken";
import moment from "moment";

// Access token expires in 1 hour
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "token-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";


interface TokenPayload {
  id: string;
  [key: string]: any;
}

const generateAccessToken = (userId: string): string => {
  const payload = {
    sub: userId,
    lat: moment().unix(),
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId: string): string => {
  const payload = {
    sub: userId,
    lat: moment().unix(),
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TokenPayload,
};
