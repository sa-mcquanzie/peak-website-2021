module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define( "image", {
    url: { type: DataTypes.JSON, allowNull: false,
          defaultValue: "https://picsum.photos/200/300"},
    description: { type: DataTypes.STRING }
  }, {
    underscored: true, timestamps: false
  })
  return Image
}
