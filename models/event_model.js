module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define( "event", {
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    start_date: { type: DataTypes.DATEONLY },
    start_time: { type: DataTypes.INTEGER },
    end_date: { type: DataTypes.DATEONLY },
    end_time: { type: DataTypes.INTEGER },
    location: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    links: { type: DataTypes.JSON }
  }, {
    underscored: true, timestamps: false
  })  
  return Event
}
