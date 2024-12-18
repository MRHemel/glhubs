// const db = require("../connections/connection");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
let table_name = "users";

let login = () => {
  return `SELECT * FROM ${table_name} WHERE email = ?`;
};
let register = () => {
  return `INSERT INTO ${table_name} (first_name,last_name, email,phone_no, password, role,status) VALUES (?,?,?,?, ?, ?, ?)`;
};

let checkUserExists = () => {
  return `SELECT * FROM ${table_name} WHERE email = ?`;
};

module.exports = {
  login,
  register,
  checkUserExists,
};

// exports.login = (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;

//   // Query to find user by email
//   db.query(
//     "SELECT * FROM users WHERE email = ?",
//     [email],
//     async (err, results) => {
//       if (err) {
//         return res.status(500).send(err); // Send error if query fails
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ message: "User not found" }); // User not found
//       }

//       const user = results[0]; // Get the user object from the results

//       // Check password against both password1 and password2 fields
//       const isMatch = await bcrypt.compare(password, user.password1);
//       // const isMatch2 = await bcrypt.compare(password, user.password2);

//       if (!isMatch) {
//         return res.status(401).json({ message: "Incorrect password" }); // Both passwords didn't match
//       }

//       // Determine user type based on which password matched
//       // let userType;
//       // if (isMatch1) {
//       //   userType = "userType1"; // If password1 matched, use userType1
//       // } else if (isMatch2) {
//       //   userType = "userType2"; // If password2 matched, use userType2
//       // }

//       // Generate JWT token for user
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: "1d", // Token expiry time
//       });

//       // Send the response with token, success message, and userType
//       res.json({
//         success: true,
//         status: 200,
//         token,
//         message: "Login successful",
//         userType: user.role, // Include the user type based on which password matched
//       });
//     }
//   );
// };
