const db = require("../config/database.js");
const userModel = "../schema/user.js";
const BookieZilla = db.BookieZilla;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const User = BookieZilla.import(userModel);

const getUserById = async function(id) {
  const userInfo = await User.findOne({
    where: {
      UserID: id
    }
  });
  return userInfo;
};

const getUserByEmail = async function(email) {
  const userInfo = await User.findOne({
    where: {
      UserEmail: email
    }
  });
  return userInfo;
};

const insertNewUser = async function(data) {
  data.id = parseInt(Math.random() * 999999, 10) + 1;
  data.psw = bcrypt.hashSync(data.psw, saltRounds);
  const userInfo = await User.create({
    UserID: data.id,
    UserName: data.username,
    UserPsw: data.psw,
    UserEmail: data.email
  }).catch(err => {
    console.log("Error in insertNewUser:", err);
  });

  return userInfo;
};

module.exports = {
  getUserById,
  getUserByEmail,
  insertNewUser
};
