import { Router } from "express";
import addProduct from "../../controllers/products/addProduct.js";
import createOrder from "../../controllers/products/createOrder.js";
import deleteProduct from "../../controllers/products/deleteProduct.js";
import fetchAllOrders from "../../controllers/products/fetchAllOrders.js";
import fetchProducts from "../../controllers/products/fetchProducts.js";
import getOrder from "../../controllers/products/getOrder.js";
import updateProduct from "../../controllers/products/updateProduct.js";
import getProduct from "../../controllers/products/getProduct.js";
const productRouter = Router();

productRouter.get('/fetch', fetchProducts);
productRouter.post('/add', addProduct);
productRouter.put('/update/:id', updateProduct);
productRouter.delete('/delete/:id', deleteProduct);
productRouter.post('/create/order', createOrder);
productRouter.get('/order', fetchAllOrders);
productRouter.get('/order/:id', getOrder);
productRouter.get('/get/:id', getProduct);



export default productRouter;