const Mongoose = require("mongoose"),
  Types = Mongoose.Schema.Types;

const modelName = "Product";

var ProductSchema = new Mongoose.Schema(
  {
    productName: {
      type: Types.String,
      required: true
    },
    categories: []
  },
  {
    timestamps: true
  }
);

ProductSchema.index({ productName: 1, categories: 1 });

module.exports = Mongoose.model(modelName, ProductSchema);
