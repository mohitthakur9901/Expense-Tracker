import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/Auth'

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/api/auth', AuthRoute)


export { app }