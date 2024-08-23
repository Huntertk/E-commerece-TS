import expres from 'express';

//Importing Routes
import userRouter from './routes/user.js'
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';


//Express App Initialization
const app = expres();

//Db Connection
connectDB();

//PORT
const port = 3000;

//Middlewares
app.use(expres.json());

//Routes
app.get('/', (req, res) => {
    res.status(200).send("Welcome, Your API is working")
});

app.use('/api/v1/user', userRouter)


//error 
app.use(errorMiddleware)


//server listen
app.listen(port, () => {
    console.log("Server is running on port", port);
    
})