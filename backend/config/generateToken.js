const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "addJWTSecrethere", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
