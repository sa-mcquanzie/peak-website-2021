require('dotenv').config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env

module.exports = {
    "development": {
      "username": DB_USERNAME,
      "password": DB_PASSWORD,
      "database": "peak_database_dev",
      "host": DB_HOST,
      "dialect": "sqlite"
    },
    "test": {
      "username": DB_USERNAME,
      "password": DB_PASSWORD,
      "database": "peak_database_test",
      "host": DB_HOST,
      "dialect": "sqlite"
    },
    "production": {
      "username": DB_USERNAME,
      "password": DB_PASSWORD,
      "database": "peak_database_production",
      "host": DB_HOST,
      "dialect": "sqlite"
    }
}
