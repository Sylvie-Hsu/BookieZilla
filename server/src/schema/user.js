/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      UserID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      UserName: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      UserPsw: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      UserEmail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
      }
    },
    {
      tableName: "user"
    }
  );
};
