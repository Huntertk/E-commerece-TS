import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { deleteProduct, getAdminProducts, getAllProductsCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controller/product.js';
import { singleUpload } from '../middlewares/multer.js';

const app = express.Router();


// /api/v1/product/new
app.post('/new', 
    adminOnly, 
    singleUpload, 
    newProduct
)

app.get('/latest', getLatestProducts)

app.get('/categories', getAllProductsCategories)


//Admin 
app.get('/admin-products', adminOnly, getAdminProducts)

app.route('/:id')
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct)

export default app;