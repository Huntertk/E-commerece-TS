import express from 'express';
import { getAllUsers, newUser, getUser, deleteUser } from '../controller/user.js';

const app = express.Router();


// /api/v1/user/new
app.post('/new', newUser)

// /api/v1/user/all
app.get('/all', getAllUsers)

// /api/v1/user/:id
app.route('/:id').get(getUser).delete( deleteUser)


export default app;