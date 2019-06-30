const db = require("../config/database.js");
const bookModel = "../schema/book.js";
const BookieZilla = db.BookieZilla;

const Book = BookieZilla.import(bookModel);

const getAllBooks = async function() {
  var result;
  const data = await Book.findAll()
    .then(books => {
      result = books;
    })
    .catch(err => {
      console.log("Error in getAllBooks:", err);
    });
  return result;
};

const getBookById = async function(id) {
  const BookInfo = await Book.findOne({
    where: {
      BookID: id
    }
  });
  return BookInfo;
};

const insertNewBook = async function(data) {
  data.BookID = parseInt(Math.random() * 999999999, 10);
  const bookInfo = await Book.create({
    BookID: data.BookID,
    BookName: data.BookName,
    BookCostPrice: parseFloat(data.BookCostPrice),
    BookSalePrice: parseFloat(data.BookSalePrice),
    BookCategory: data.BookCategory,
    BookPhoto: data.BookPhoto,
    BookContent: data.BookContent,
    BookISBN: data.BookISBN,
    BookRefs: data.BookRefs
  }).catch(err => {
    console.log("Error in insertNewBook:", err);
  });
  return bookInfo;
};

module.exports = {
  insertNewBook,
  getAllBooks,
  getBookById
};
