import User from "../models/User";
import Token from "../models/Token";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import {
  UserDocument,
  UserPayload,
  AuthResult,
  RequestUser,
  AuthenticatedRequest,
} from "../types";

// Register a new user
const register = async (userData: UserPayload): Promise<RequestUser> => {
  const { username, password } = userData;

  // Check if username already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new Error("Username already taken");
  }

  // Create user
  const user = (await User.create({
    username,
    password,
  })) as UserDocument;

  return {
    _id: user._id.toString(),
  };
};

// Login user
const login = async (credentials: UserPayload): Promise<AuthResult> => {
  const { username, password } = credentials;

  // Find user by username
  const user = (await User.findOne({ username })) as UserDocument | null;
  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Check password
  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // Generate tokens
  const userId = user._id.toString();
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  // Save refresh token to database
  await Token.create({
    userId: user._id,
    token: refreshToken,
  });

  return {
    user: {
      _id: user._id,
      username: user.username,
    },
    accessToken,
    refreshToken,
  };
};

// Refresh token
const refreshToken = async (token: string): Promise<string> => {
  if (!token) {
    throw new Error("Refresh token is required");
  }

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(token);

    // Check if token exists in database
    const existingToken = await Token.findOne({ userId: decoded.sub, token });
    if (!existingToken) {
      throw new Error("Invalid refresh token");
    }

    // Generate new access token
    const accessToken = generateAccessToken(decoded.sub);
    await Token.findOneAndUpdate({ userId: decoded.sub, accessToken });

    return accessToken;
  } catch (error) {
    throw new Error("Please authenticate");
  }
};

// Logout user
const logout = async (userId: string, token: string): Promise<boolean> => {
  // Delete refresh token from database
  await Token.findOneAndDelete({ userId, token });
  return true;
};

export { register, login, refreshToken, logout };
