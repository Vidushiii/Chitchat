const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "addJWTSecrethere", {
    expiresIn: "530d",
  });
};

module.exports = generateToken;
