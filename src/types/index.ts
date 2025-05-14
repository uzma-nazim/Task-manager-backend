import { Request } from 'express';
import { Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  _id: string
  password: string;
  createdAt: Date;
  isPasswordMatch(candidatePassword: string): Promise<boolean>;
}
interface RequestUser {
  
  _id: string
  
}

interface TaskDocument extends Document {
  title: string;
  checklistItems: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  user: string | UserDocument;
  createdAt: Date;
}

interface TokenDocument extends Document {
  userId: string | UserDocument;
  token: string;
  createdAt: Date;
}

interface UserPayload {
  username: string;
  password: string;
}

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
} 

interface AuthResult {
  user: {
    _id: string;
    username: string;
  };
  accessToken: string;
  refreshToken: string;
}

export {
  UserDocument,
  TaskDocument, 
  RequestUser,
  TokenDocument,
  UserPayload,
  AuthenticatedRequest,
  AuthResult
};