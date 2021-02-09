module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define( "post", {
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    text: { type: DataTypes.STRING },
    links: { type: DataTypes.JSON },
    date: { type: DataTypes.DATE },
    published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    underscored: true, timestamps: false
  })
  return Post
}
