const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  process.env.NEO4J_HOST,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

exports.getSession = (context = {}) => {
  if (context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

const _whereTemplate = (name, key, paramKey) => {
  return name + "." + key + "={" + (paramKey || key) + "}";
};

exports.dbWhere = (name, keys) => {
  if (_.isArray(name)) {
    _.map(name, obj => {
      return _whereTemplate(obj.name, obj.key, obj.paramKey);
    });
  } else if (keys && keys.length) {
    return (
      "WHERE " +
      _.map(keys, key => {
        return _whereTemplate(name, key);
      }).join(" AND ")
    );
  }
};
