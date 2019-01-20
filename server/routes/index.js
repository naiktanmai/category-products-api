const { Router } = require("express");
const { getCategories, addCategory } = require("../controllers/categories");
const {
  createProduct,
  updateProduct,
  getProductByCategory
} = require("../controllers/products");
const { celebrate } = require("celebrate");

const {
  getCategoriesSchema,
  createProductSchema,
  updateProductSchema,
  postCategoriesSchema,
  getProductByCategorySchema
} = require("../utils/validationSchemas");

let routes = Router();

routes.post("/category", celebrate(postCategoriesSchema), addCategory);
routes.get("/category", celebrate(getCategoriesSchema), getCategories);

routes.post("/product", celebrate(createProductSchema), createProduct);
routes.patch("/product/:id", celebrate(updateProductSchema), updateProduct);
routes.get(
  "/product/category/:categoryId",
  celebrate(getProductByCategorySchema),
  getProductByCategory
);

module.exports = routes;
