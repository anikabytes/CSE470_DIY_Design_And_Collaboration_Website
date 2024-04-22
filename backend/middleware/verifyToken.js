import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) {
          res.status(400).json({ message: err.message });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(400).json({ message: "Access Denied" });
    }
  };
  
export default verifyToken;