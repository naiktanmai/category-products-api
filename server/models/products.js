const Product = require("./neo4j/product");
const Category = require("./neo4j/category");
const cuid = require("cuid");

exports.editProduct = async (session, { id }, { name }) => {
  let query = [
    `MATCH (product:Product {id: \"${id}\" })`,
    `SET product.name = \"${name}\"`,
    "RETURN product"
  ].join("\n");

  let updateProduct = await session.run(query);
  let product = new Product(updateProduct.records[0].get("product"));
  return product;
};

exports.addProduct = async (session, { name, categories = [] }) => {
  let newProduct = await session.run(
    `CREATE (product:Product {id: {id}, name: {name}}) RETURN product`,
    {
      id: cuid(),
      name
    }
  );

  let product = new Product(newProduct.records[0].get("product"));

  if (categories.length) {
    let addRelationsQuery = [
      `MATCH(product:Product {id: \"${product.id}\"})`,
      "MATCH(category:Category) where id(category) IN " +
        "[" +
        categories +
        "]",
      "CREATE (category) -[:HAS_PRODUCT]-> (product)",
      "RETURN product, category "
    ].join("\n");

    let linkCategory = await session.run(addRelationsQuery);

    linkCategory = linkCategory.records.map(
      r => new Category(r.get("category"))
    );
    return {
      product,
      linkCategory
    };
  }

  return product;
};
