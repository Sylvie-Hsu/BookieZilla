const db = require("../config/database.js");
const orderModel = "../schema/order.js";
const BookieZilla = db.BookieZilla;

const Order = BookieZilla.import(orderModel);

const getOrderById = async function(id) {
  const orderInfo = await Order.findOne({
    where: {
      BookID: id
    }
  });
  console.log("orderinfo" + orderInfo);
  return orderInfo;
};

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

const updateOrderOfTrade = async function(data) {
  const order = await Order.findOne({
    where: {
      OrderID: data.OrderID
    }
  });
  order
    .update({
      TradeStatus: false,
      TraderID: data.UserID
    })
    .then(order => console.log(order))
    .catch(err => {
      console.log("Error in insertNewOrder:", err);
    });
  return order;
};

module.exports = {
  insertNewOrder,
  getOrderById,
  updateOrderOfTrade
};
