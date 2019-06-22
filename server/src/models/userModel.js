const db = require("../config/database.js");
const userModel = "../schema/user.js";
const BookieZilla = db.BookieZilla;

const User = BookieZilla.import(userModel);

const getUserById = async function(id) {
  const userInfo = await User.findOne({
    where: {
      UserID: id
    }
  });
  return userInfo;
};

module.exports = {
  getUserById
};
