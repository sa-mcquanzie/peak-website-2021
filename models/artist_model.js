module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define( "artist", {
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: "New" },
    given_name: { type: DataTypes.STRING },
    family_name: { type: DataTypes.STRING },
    bio: { type: DataTypes.STRING },
    links: { type: DataTypes.JSON }
  }, {
    underscored: true, timestamps: false
  })
return Artist
}

