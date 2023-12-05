import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { dbInstance } from './middleware/dbInstance';


// Create Express server instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(dbInstance);

/* --- Home Routes --- */
app.get('/', (req, res) => {
    const filePath = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8');
    res.send(filePath);
});

/* Cheak Db connected or not */
app.get('/db', (req, res) => {
    const db = (req as any).db;
    if (db) {
        res.send({ status: 'success', message: 'Database connected successfully' });
    }
    else {
        res.send({ status: 'error', message: 'Database connection failed' });
    }
});


// Other Routes import
import basicRoutes from './routes/basicRoutes';

// Use Routes
app.use('/api', basicRoutes);

export default app;