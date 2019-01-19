const { getSession } = require("../../utils/db");
const Categories = require("../../models/categories");

exports.getCategories = async (req, res, next) => {
  try {
    let categories = await Categories.getAll(getSession(req));
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    let categories = await Categories.addCategory(getSession(req), req.body);
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
