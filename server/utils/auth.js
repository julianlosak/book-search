const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) { // Destructure the req object
    let token;

    if (req.headers.authorization) {
      // Extract the token from the 'Authorization' header
      token = req.headers.authorization.split(" ").pop().trim();
    } else if (req.body.token) {
      // Check if the token is in the request body
      token = req.body.token;
    } else if (req.query.token) {
      // Check if the token is in the request query parameters
      token = req.query.token;
    }

    if (!token) {
      // If no token is found, return req as it is
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      // Attach the user data to the request object
      req.user = data;
    } catch (error) {
      console.log("Invalid token:", error.message); // Log the error message
    }

    return req;
  },
};