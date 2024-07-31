import { StatusCodes } from "http-status-codes";
import Order from "../models/OrderModel";
import ApiError from "../utils/ApiError";
import Product from "../models/ProductModel";
import Cart from "../models/CartModel";

class OrdersController {
  // GET /orders
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }
  // GET /orders/:id
  async getOrderDetail(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getOdertUser(req, res, next) {
    try {
      const order = await Order.findOne({ user: req.params.id }).populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      // if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      next(error);
    }
  }
  // POST /orders
  async createOrder(req, res, next) {
    try {
      const newOrder = await Order.create(req.body);
      const cart = await Cart.findOneAndDelete({ user: req.body.user });
      if (!cart) throw new ApiError(404, "Cart Not Found");
      res.status(StatusCodes.CREATED).json({
        message: "Create Order Successfull",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /orders/:id
  async updateOrder(req, res, next) {
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateOrder) throw new ApiError(404, "Order Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Order Successfull",
        data: updateOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteProductOder(req, res, next) {
    try {
      const { userId, id } = req.params;
      const oder = await Order.findOne({ user: userId });
      if (!oder) throw new ApiError(404, "Order Not Found");

      const newProductOder = oder.products.filter((item) => item.product != id);

      const updateOder = await Order.findByIdAndUpdate(
        oder._id,
        { products: newProductOder },
        {
          new: true,
        }
      );
      if (!updateOder) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.CREATED).json({
        message: "Delete Product Order Successfull",
        data: updateOder,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /orders/:id
  async deleteOrder(req, res, next) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) throw new ApiError(404, "Order Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Order Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
