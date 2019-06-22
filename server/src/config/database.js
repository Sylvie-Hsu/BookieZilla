const Sequelize = require("sequelize");

const BookieZilla = new Sequelize(
  "mysql://root:sylvie058@localhost/bookiezilla",
  {
    define: {
      timestamps: false
    }
  }
);

module.exports = {
  BookieZilla
};
