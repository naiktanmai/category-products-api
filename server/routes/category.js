const { Router } = require("express");
const { getCategories } = require("../controllers/categories");
const { getCategoriesSchema } = require("../utils/validationSchemas");
const { celebrate } = require("celebrate");
let routes = Router();

routes.get("/", celebrate(getCategoriesSchema), (req, res, next) => {
  getCategories(req.query)
    .then(data => res.status(200).json(data))
    .catch(next);
});

routes.post("/", (req, res, next) => {
  addCategory(req.body)
    .then(data => res.status(200).json(data))
    .catch(next);
});

module.exports = routes;
