const jwt = require("jsonwebtoken")
 
const requireAuth = async (req, res, next) => {
  try {
    // const { token } = req.headers;
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1]
    if (!token) {
      res.status(401).json({ status: "FAILED", message: "no token present" });
    }
    const user = await jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ status: "FAILED", message: e.message });
  }
};

module.exports  = requireAuth;
