module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define( "work", {
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    materials: { type: DataTypes.STRING },
    dimensions: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    production_date: { type: DataTypes.DATEONLY },
    for_sale: { type: DataTypes.BOOLEAN },
    price: { type: DataTypes.INTEGER }
  }, {
    underscored: true, timestamps: false
  })
  return Work
}
