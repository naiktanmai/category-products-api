const Category = require("../../models/CategoryModel");

exports.addCategory = async ({ categoryName = "", subCategories = [] }) => {
  let newCategory = await new Category({
    categoryName,
    subCategories
  }).save();

  return newCategory;
};

exports.getCategories = async ({ page, perPage }) => {
  let categories = await Category.find({}).paginate(page, perPage);
  return categories;
};
