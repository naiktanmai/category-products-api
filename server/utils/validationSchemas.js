const { Joi } = require("celebrate");

exports.getCategoriesSchema = {
  query: Joi.object().keys({
    perPage: Joi.number(),
    page: Joi.number()
  })
};
