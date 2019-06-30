const book = require("../models/bookModel.js");
const order = require("../models/orderModel.js");

const getAllBooks = async function(ctx) {
  const books = await book.getAllBooks();
  ctx.body = books;
};

const publishNewBook = async function(ctx) {
  const data = ctx.request.body;
  const bookInfo = await book.insertNewBook(data);
  const orderInfo = await order.insertNewOrder(data, bookInfo.BookID);

  if (bookInfo != null && orderInfo != null) {
    ctx.body = {
      status: true,
      bookInfo: bookInfo,
      orderInfo: orderInfo
    };
  } else {
    ctx.body = {
      status: false,
      msg: "Create order fail"
    };
  }
};

module.exports = {
  publishNewBook,
  getAllBooks
};
