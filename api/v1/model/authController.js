// const connectionBclMYSQL = require("../connections/connection");
const { connectionBclMYSQL } = require("../connections/connection");
const queries = require("../controllers/authController");
const isEmpty = require("is-empty");

// Promises Method

let login = async ({ email }) => {
  return new Promise((resolve, reject) => {
    let abc = connectionBclMYSQL.query(
      queries.login(),
      [email],
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    console.log("object", abc);
  });
};
let register = async (user) => {
  return new Promise((resolve, reject) => {
    connectionBclMYSQL.query(
      queries.register(),
      [
        user.first_name,
        user.last_name,
        user.email,
        user.phone_no,
        user.password,
        user.role,
        user.status,
      ],
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

let checkUserExists = async (email) => {
  return new Promise((resolve, reject) => {
    connectionBclMYSQL.query(
      queries.checkUserExists(),
      [email],
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};
module.exports = {
  login,
  register,
  checkUserExists,
};
