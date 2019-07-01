const db = require("../config/database.js");
const commentModel = "../schema/comment.js";
const BookieZilla = db.BookieZilla;

const Comment = BookieZilla.import(commentModel);

const getAllComments = async function() {
  var result;
  const data = await Comment.findAll({
    order: [["Time", "DESC"]]
  })
    .then(comments => {
      result = comments;
    })
    .catch(err => {
      console.log("Error in getAllComments:", err);
    });
  return result;
};

const publishNewComment = async function(data) {
  data.CommentID = parseInt(Math.random() * 999999999, 10);
  const commentInfo = await Comment.create({
    CommentID: data.CommentID,
    UserID: data.UserID,
    UserName: data.UserName,
    ReplyID: data.ReplyID,
    Content: data.Content,
    Time: data.Time
  }).catch(err => {
    console.log("Error in publishNewComment:", err);
  });
  return commentInfo;
};

module.exports = {
  publishNewComment,
  getAllComments
};
