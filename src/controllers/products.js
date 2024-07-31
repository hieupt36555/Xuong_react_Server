import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel";
import ApiError from "../utils/ApiError";

class ProductsController {
  // GET /products
  async getAllProducts(req, res, next) {
    try {


      const { q , page = 1, limit = 10 } = req.query;
      const query = q ? { title: new RegExp(q, 'i') } : {};

      const products = await Product.find(query).skip((page - 1) * limit).limit(parseInt(limit));
      const total = await Product.countDocuments(query);

      res.json({
        products,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      });

    } catch (error) {
      next(error);
    }
  }
  // async getAllProducts(req, res, next) {
  //   try {
  //     const products = await Product.find().populate("category");
  //     res.status(StatusCodes.OK).json(products);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  //sort
  // async sortProduct(req, res, next) {
  //   try {
  //     const { sort } = req.query;

  //     let sortedProducts = [...Product];
  //     if (sort === 'asc') {
  //       sortedProducts.sort((a, b) => a.price - b.price);
  //     } else if (sort === 'desc') {
  //       sortedProducts.sort((a, b) => b.price - a.price);
  //     }

  //     res.json(sortedProducts);
  //   } catch (error) {

  //   }


  // }
  // GET /products/:id
  async getProductDetail(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }
  // POST /products
  async createProduct(req, res, next) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Product Successfull",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /products/:id
  async updateProduct(req, res, next) {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateProduct) throw new ApiError(404, "Product Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Product Successfull",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Product Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductsController;
