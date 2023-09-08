import { Router } from "express";
import addProduct from "../../controllers/products/addProduct.ts";
import createOrder from "../../controllers/products/createOrder.ts";
import deleteProduct from "../../controllers/products/deleteProduct.ts";
import fetchAllOrders from "../../controllers/products/fetchAllOrders.ts";
import fetchProducts from "../../controllers/products/fetchProducts.ts";
import getOrder from "../../controllers/products/getOrder.ts";
import updateProduct from "../../controllers/products/updateProduct.ts";
import getProduct from "../../controllers/products/getProduct.ts";
const productRouter = Router();

productRouter.get("/fetch", fetchProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.post("/create/order", createOrder);
productRouter.get("/order", fetchAllOrders);
productRouter.get("/order/:id", getOrder);
productRouter.get("/get/:id", getProduct);

export default productRouter;
