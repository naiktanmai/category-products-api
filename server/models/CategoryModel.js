const Mongoose = require("mongoose"),
  Types = Mongoose.Schema.Types;

const modelName = "Category";

var CategorySchema = new Mongoose.Schema(
  {
    categoryName: {
      type: Types.String,
      required: true,
      unique: true
    },
    subCategories: []
  },
  {
    timestamps: true
  }
);

CategorySchema.index({ categoryName: 1, subCategories: 1 });

module.exports = Mongoose.model(modelName, CategorySchema);
