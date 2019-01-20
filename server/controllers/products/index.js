const { getSession } = require("../../utils/db");
const Products = require("../../models/products");

exports.createProduct = async (req, res, next) => {
  try {
    let product = await Products.addProduct(getSession(req), req.body);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Products.editProduct(
      getSession(req),
      req.params,
      req.body
    );
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProductByCategory = async (req, res, next) => {
  try {
    let products = await Products.getProductByCategory(
      getSession(req),
      req.params
    );
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
