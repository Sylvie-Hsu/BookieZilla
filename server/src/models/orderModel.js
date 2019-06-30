const db = require("../config/database.js");
const orderModel = "../schema/order.js";
const BookieZilla = db.BookieZilla;

const Order = BookieZilla.import(orderModel);

const insertNewOrder = async function(data, BookID) {
  data.OrderID = parseInt(Math.random() * 999999999, 10);
  const orderInfo = await Order.create({
    OrderID: data.OrderID,
    UserID: data.UserID,
    BookID: BookID,
    TradeMethod: data.TradeMethod,
    TradeStatus: true,
    TradeParty: data.TradeParty,
    TraderID: null
  }).catch(err => {
    console.log("Error in insertNewOrder:", err);
  });
  return orderInfo;
};

module.exports = {
  insertNewOrder
};
