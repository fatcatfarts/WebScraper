const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = 3000;
const { authenticateToken } = require('./middleware/authmiddleware.js');
const path = require('path');
const router = require('./routes/authr.js');
const { SECRET_KEY, salt } = require('./utils/const.js');

app.use(cookieParser());


// const search = require('./auth/authentication.js');
//!IMPORTANT NOTE: Make sure to use express.json before route handling
// 2) express.static serves files relative to directory where code is running from terminal, and path.join makes it absolute by serving that path where 
// ur code really is inside folder


app.use(express.static(path.join(__dirname, 'Pages')));
// app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors(origin = '*'));

app.use('/auth', router)
app.use('/scrape', router)
app.use('/save', router)
app.use('/getsaves', router)



app.get('/', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/Pages/scraping.html')
});

app.get('/logout', authenticateToken, (req, res) => {
  res.clearCookie('cookie', { path: '/', httpOnly: true }).redirect('/');
});

app.get('/api/data', authenticateToken, (req, res) => { // to get username from cookie
  res.json({ username: req.username });
});


app.get('/viewsaves', authenticateToken, async (req, res) => { // for ejs file
  try {
    const response = await fetch('http://localhost:3000/getsaves/savedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: req.username })
    });

    const result = await response.json();
    res.render(__dirname + '/Pages/saves.ejs', { saves: result.history, createdat: result.createdat, list: ['BODY', 'HEADING', 'LINK', 'PARAGRAPH', 'ARTICLE', 'LIST'] });
  } catch (err) { console.log(err) }
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/Pages/signup.html')
});


app.post('/verified', async (req, res) => { // to set a cookie after verification
  const { username, password } = req.body;
  const authData = {
    "username": username,
    "password": password
  };
  try {
    const response = await fetch('http://localhost:3000/auth/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    });

    const result = await response.json();
    if (result.ans) {
      let token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).cookie('cookie', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).json({ ans: true });
      // this generates a cookie, with name 'cookie' , value of token, expiry and sends back a success and username

    }
    else {
      res.json({ ans: false, error: result.error });
    }
  } catch (err) {
    res.status(500).send('Failed to fetch data');
  }
});


app.get('/verified/home', (req, res) => {
  res.sendFile(__dirname + '/Pages/login.html');
});

app.listen(port, () => {});
