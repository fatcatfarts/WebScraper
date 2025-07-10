const express = require('express'); 
const router = express.Router();
const { verify,signup,saver,getdata} =require('../controller/control2.js');
const {scraper} = require('../controller/scrapecontr.js');

router.post('/data', verify);
router.post('/signup', signup);
router.post('/data2',scraper);
router.post('/data3',saver);
router.post('/savedata',getdata)
module.exports = router;
