import expres from 'express';

const app = expres();

const port = 3000;


app.listen(port, () => {
    console.log("Server is running on port", port);
    
})