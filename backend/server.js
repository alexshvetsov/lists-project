import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import listRoutes from './routes/listRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddeleware.js'

dotenv.config()

connectDB()

const app = express();


app.use(express.json())



app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes)
app.use('/api/lists', listRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running in mode on port ' + PORT))   