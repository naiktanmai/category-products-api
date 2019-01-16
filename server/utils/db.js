const mongoose = require("mongoose");
const Promise = require("bluebird");

mongoose.Query.prototype.paginate = function(page = 1, perPage = 10) {
  page = Number(page);
  const limit = perPage || 10;
  let customQuery;
  if (isNaN(page)) {
    customQuery = Promise.props({
      total: this.model.count(this.getQuery()),
      result: this
    });
  } else {
    page--;
    customQuery = Promise.props({
      total: this.model.count(this.getQuery()),
      limit,
      page,
      result: this.limit(limit).skip(page * limit)
    });
  }

  return customQuery;
};

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);
