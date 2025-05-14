import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import cors from "cors"

// Load environment variables
dotenv.config();

// Import main router
import mainRouter from './routes';

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
// Mount main router on /api/v1
app.use('/api/v1', mainRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
    res.send('Task Manager API is running');
});

// Error handling middleware
interface ErrorWithMessage extends Error {
    stack?: string;
}

app.use((err: ErrorWithMessage, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server with database connection
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Connect to database and start server
const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error('Failed to connect to MongoDB:', error.message);
    }
};

startServer(); 