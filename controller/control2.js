const { salt } = require('../utils/const.js');
const bcrypt = require('bcryptjs');
const connectDB = require('../Models/db.js');
const User = require('../Models/usermodel.js');

connectDB();

async function crud(selection, data) {
  try {
    // === CREATE (C) ===
    if (selection === 1) {
      const newUser = await User.create({
        username: data.username,
        password: data.password,
      });
      return { success: true };
    }

    // === READ (R) ===
    if (selection === 2) {
      const oneUser = await User.findOne({ username: data.username });
      // console.log('Found one User:', oneUser);
      return oneUser;
    }


    // === UPDATE (U) ===
    if (selection === 3) {

      history = data.history; key = data.ptr;
      history[key] = data.chat;
      key = key < 49 ? key + 1 : 0;
      const updateUser = await User.findByIdAndUpdate(
        data._id,
        { history: history, ptr: key },
        { new: true, runValidators: true } // runValidators ensures the update still follows schema rules, and new gives us the updated object
      );
    }

    if (selection === 4) {
      // === DELETE (D) ===
      const deleteUser = await User.deleteOne({ username: data.username });

      const deletedByIdResult = await User.findByIdAndDelete('...');
    }

  } catch (error) {
    return { success: false, error: error.message };
  }
}
///////////////////////////////////////////////////////////////////////

const verify = async (req, res) => {
  const text = req.body;
  const oth = await crud(2, text);

  if (oth === null) {
    return res.send({ ans: false, error: 'Username is not registered' });
  }
  if (await bcrypt.compare(text.password, oth.password) && (text.username === oth.username)) {
    return res.send({ ans: true });  // Exit early after success
  }
  else {
    return res.send({ ans: false, error: 'Incorrect username or password' });
  }
}

////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
const signup = async (req, res) => {

  const text = req.body;
  if (!text.password.trim()) { return res.status(400).json({ success: false, error: "Password cannot be empty" }) }

  text['password'] = await bcrypt.hash(text.password, salt);
  const oth = await crud(1, text);
  if (oth.success) {
    return res.status(201).json({ success: true });
  } else {
    return res.status(400).json({ success: false, error: oth.error });
  }

}
//////////////////////////////////////////////////////////
const saver = async (req, res) => {
  const scrapedata = req.body;// username, content
  const userdata = await crud(2, scrapedata)
  const array = userdata.history;
  if (!scrapedata.checked) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === -1) { break }
      else {
        if (array[i][0] === scrapedata.content[0]) {
          return res.json({ success: false, checked: true });
        }
      }
    }
  }
  userdata['chat'] = scrapedata.content;
  await crud(3, userdata);
  try {
    res.status(200).json({ success: true, checked: false });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error updating ', checked: false });
  }
};

/////////////////////////////////////////////////////////////
const getdata = async (req, res) => {
  const userinfo = req.body;
  const userdata = await crud(2, userinfo);
  const history = userdata.history;
  for (let i = 0; i < history.length; i++) {
    if (history[i] === -1) {
      history.splice(i); // remove from index i to end
      break;
    }
  }
  return res.json({ history: history, createdat: userdata.createdAt });
}

module.exports = { verify, signup, saver, getdata };