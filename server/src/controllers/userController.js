const user = require("../models/userModel.js");

const getUserInfo = async function(ctx) {
  const id = ctx.params.id;
  const result = await user.getUserById(id);
  ctx.body = result;
};

module.exports = {
  getUserInfo
};
