const Category = require("./neo4j/category");
const cuid = require("cuid");

const categoryWithSubCategories = neo4jResult => {
  return neo4jResult.records.map(r => {
    return r.toObject();
  });
};

const getCategories = async session => {
  let query = [
    "MATCH p=(n:Category)-[:HAS_SUBCATEGORY*]->(m)",
    "WITH COLLECT(p) AS ps",
    "CALL apoc.convert.toTree(ps) yield value",
    "RETURN value;"
  ].join("\n");
  let categories = await session.run(query);
  return categories;
};

exports.getAll = async session => {
  let categories = await getCategories(session).then(categoryWithSubCategories);

  return categories;
};

const linkCategories = async (
  session,
  categoryId,
  subCategories = [],
  parentCategories = []
) => {
  let addRelationsQuery = [
    `MATCH(category:Category {id: \"${categoryId}\"})`,
    "MATCH(subCategory:Category) WHERE subCategory.id IN " +
      "[" +
      subCategories.map(c => `\"${c}\"`).join(",") +
      "]",
    "MATCH(parentCategory:Category) WHERE parentCategory.id IN " +
      "[" +
      parentCategories.map(c => `\"${c}\"`).join(",") +
      "]",
    "CREATE UNIQUE(category) -[:HAS_SUBCATEGORY]-> (subCategory)",
    "CREATE UNIQUE(category) <-[:HAS_SUBCATEGORY]- (parentCategory)",
    "RETURN subCategory, parentCategory"
  ].join("\n");
  console.log(addRelationsQuery);

  let linkCategory = await session.run(addRelationsQuery);

  return linkCategory.records.map(r => {
    return {
      subCategories: new Category(r.get("subCategory")),
      parentCategories: new Category(r.get("parentCategory"))
    };
  });
};

exports.addCategory = async (
  session,
  { name, subCategories = [], parentCategories = [] }
) => {
  let newCategory = await session.run(
    `CREATE (category:Category {id: {id}, name: {name}}) RETURN category`,
    {
      id: cuid(),
      name
    }
  );

  let category = new Category(newCategory.records[0].get("category"));

  if (subCategories.length || parentCategories.length) {
    let linkedCategories = await linkCategories(
      session,
      category.id,
      subCategories,
      parentCategories
    );
    return {
      category,
      links: linkedCategories
    };
  }

  return category;
};
