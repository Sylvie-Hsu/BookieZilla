const db = require("../config/database.js");
const bookModel = "../schema/book.js";
const BookieZilla = db.BookieZilla;

const Book = BookieZilla.import(bookModel);

var Sequelize = require("sequelize");
var Op = Sequelize.Op;

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

const searchBooks = async function(data) {
  console.log(data);
  const books = await Book.findAll({
    where: {
      [Op.or]: [
        {
          BookName: {
            [Op.like]: "%" + data + "%"
          }
        },
        {
          BookCategory: {
            [Op.like]: "%" + data + "%"
          }
        },
        {
          BookISBN: {
            [Op.like]: "%" + data + "%"
          }
        }
      ]
    }
  }).catch(err => {
    console.log("Error in searchBooks:", err);
  });
  return books;
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
  getBookById,
  searchBooks
};
