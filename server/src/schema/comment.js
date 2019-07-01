/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "comment",
    {
      CommentID: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        primaryKey: true
      },
      UserID: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      UserName: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      ReplyID: {
        type: DataTypes.INTEGER(15),
        allowNull: true
      },
      Content: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      Time: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      tableName: "comment"
    }
  );
};
