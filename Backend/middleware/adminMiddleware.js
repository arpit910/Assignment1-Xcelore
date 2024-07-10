const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send(" No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

const adminMiddleware = async (req, res, next) => {
  if (!req.user) return res.status(401).send(" Admin access denied !");

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found.");

    if (user.role !== "admin")
      return res.status(403).send("Access denied. Admins only.");

    req.user.role = user.role;
    next();
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

module.exports = { authMiddleware, adminMiddleware };
