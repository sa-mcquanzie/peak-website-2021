module.exports = (sequelize, DataTypes) => {
  const Edition = sequelize.define( "edition", {
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    materials: { type: DataTypes.STRING },
    dimensions: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    production_date: { type: DataTypes.DATEONLY },
    edition_size: { type: DataTypes.INTEGER },
    remaining: { type: DataTypes.INTEGER },
    cost: { type: DataTypes.INTEGER },
    links: { type: DataTypes.JSON }
  }, {
    underscored: true, timestamps: false
  })
  return Edition
}
