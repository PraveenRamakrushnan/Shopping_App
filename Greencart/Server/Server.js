import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'; 
import userRouter from './routes/userRout.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB()


//allow multiple origins
const allowedOrigins = ['http://localhost:5173']

//middleware configurations
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({origin: allowedOrigins, Credentials: true}));



app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user',userRouter)

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
})

