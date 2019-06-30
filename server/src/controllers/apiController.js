const book = require("../models/bookModel.js");
const order = require("../models/orderModel.js");

const getAllBooks = async function(ctx) {
  const books = await book.getAllBooks();
  ctx.body = books;
};

const searchBooks = async function(ctx) {
  const data = ctx.request.body.info;
  const books = await book.searchBooks(data);
  ctx.body = books;
};

const getOrderInfo = async function(ctx) {
  const bookid = ctx.params.id;
  const bookInfo = await book.getBookById(bookid);
  const orderInfo = await order.getOrderById(bookid);
  ctx.body = {
    bookInfo: bookInfo,
    orderInfo: orderInfo
  };
};

const updateOrderOfTrade = async function(ctx) {
  const data = ctx.request.body;
  const orderInfo = await order.updateOrderOfTrade(data);
  ctx.body = {
    status: true,
    orderInfo: orderInfo
  };
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
  getAllBooks,
  getOrderInfo,
  updateOrderOfTrade,
  searchBooks
};
