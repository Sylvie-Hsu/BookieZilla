/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "book",
    {
      BookID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      BookName: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      BookCostPrice: {
        type: "DOUBLE",
        allowNull: true
      },
      BookSalePrice: {
        type: "DOUBLE",
        allowNull: true
      },
      BookCategory: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      BookPhoto: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      BookContent: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      BookISBN: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: "book"
    }
  );
};
