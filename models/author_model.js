module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define( "author", {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    given_name: { type: DataTypes.STRING },
    family_name: { type: DataTypes.STRING }
  }, {
    underscored: true, timestamps: false
  })
  return Author
}
