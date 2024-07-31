import { Router } from "express";
import authRouter from "./auth.js";
import categoriesRouter from "./categories.js";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
import ordersRouter from "./orders.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/orders", ordersRouter);

export default router;
