const user = require("../models/userModel.js");
const msg = require("../models/CommentModel.js");

const getAllComments = async function(ctx) {
  const comments = await msg.getAllComments();
  ctx.body = comments;
};

const publishNewComment = async function(ctx) {
  const data = ctx.request.body;
  const UserInfo = await user.getUserById(data.UserID);
  data.UserName = UserInfo.UserName;
  const MsgInfo = await msg.publishNewComment(data);
  const comments = await msg.getAllComments();
  ctx.body = comments;
};

module.exports = {
  publishNewComment,
  getAllComments
};
