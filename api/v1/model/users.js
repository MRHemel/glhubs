const { connectionBclMYSQL } = require("../connections/connection");
const queries = require("../controllers/users");
const isEmpty = require("is-empty");

// Promises Method

let getList = async () => {
  return new Promise((resolve, reject) => {
    connectionBclMYSQL.query(queries.getList(), (error, result, fields) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};
module.exports = {
  getList,
};
