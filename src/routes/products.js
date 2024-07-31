import { Router } from "express";
import ProductsController from "../controllers/products.js";

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get("/", productsController.getAllProducts);
// productsRouter.get("/", productsController.sortProduct);
productsRouter.get("/:id", productsController.getProductDetail);
productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

export default productsRouter;
