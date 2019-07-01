const Sequelize = require("sequelize");

const BookieZilla = new Sequelize(
  "mysql://root:xxxxxx@localhost/bookiezilla",
  {
    define: {
      timestamps: false
    }
  }
);

module.exports = {
  BookieZilla
};
