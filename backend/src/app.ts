import expres from 'express';

//Importing Routes
import userRouter from './routes/user.js'

const app = expres();

const port = 3000;

//Routes
app.use('/api/v1/user', userRouter)

app.listen(port, () => {
    console.log("Server is running on port", port);
    
})