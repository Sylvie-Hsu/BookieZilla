/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "order",
    {
      OrderID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      UserID: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      BookID: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      TradeMethod: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      TradeStatus: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      TradeParty: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      TraderID: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      tableName: "order"
    }
  );
};
