module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define( "book", {
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    format: { type: DataTypes.STRING },
    isbn: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    publication_date: { type: DataTypes.DATEONLY },  
  }, {
    underscored: true, timestamps: false
  })
  return Book
}
