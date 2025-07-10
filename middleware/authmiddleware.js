const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/const.js');

function authenticateToken(req, res, next) {
  const token = req.cookies.cookie;// gets cookie from browser
  if (!token) {
    return res.redirect('/verified/home');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.username = decoded.username; // this adds another key in req named username, and it gets updated
    next(); // triggers the next in line
  } catch (err) {
    return res.redirect('/verified/home');
  }
}



module.exports = { authenticateToken };
