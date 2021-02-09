module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define ( "user", {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" }
  }, {
    underscored: true, timestamps: false
  })
  return User
}
