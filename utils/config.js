const envName = process.env.NODE_ENV.toUpperCase()

if (envName !== 'PRODUCTION') {
  require('dotenv').config()
}

const dbUrl = process.env[`BLOGLIST_${envName}_MONGODB_URL`]
const port = process.env[`BLOGLIST_${envName}_PORT`]

module.exports = {
  dbUrl, port
}