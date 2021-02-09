module.exports = (sequelize, DataTypes) => {
  const Ephemeron = sequelize.define( "ephemeron", {
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    materials: { type: DataTypes.STRING },
    dimensions: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    acquisition_date: { type: DataTypes.DATEONLY },
    links: { type: DataTypes.JSON }
  }, {
    tableName: "ephemera", underscored: true, timestamps: false
  })
  return Ephemeron
}
