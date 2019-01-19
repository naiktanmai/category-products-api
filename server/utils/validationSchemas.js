const { Joi } = require("celebrate");

exports.postCategoriesSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subCategories: Joi.array().items(Joi.string()),
    parentCategories: Joi.array().items(Joi.string())
  })
};

exports.getCategoriesSchema = {
  query: Joi.object().keys({
    perPage: Joi.number(),
    page: Joi.number()
  })
};

exports.createProductSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    categories: Joi.array().items(Joi.string())
  })
};

exports.updateProductSchema = {
  params: Joi.object().keys({
    id: Joi.string().required()
  }),
  body: Joi.object().keys({
    name: Joi.string().required()
  })
};
