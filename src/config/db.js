/* Setup DB below */

// import required dependencies
const mysql = require('mysql')

// import required files
const config = require('./config')

// init object db connection
const connection = mysql.createConnection(config.database.mysql)

// console.log(config.database.mysql)

// connect to db
connection.connect((error) => {
	if (error) {
		console.log(`Error: ${error}`)
	} else {
		console.log('connect to database successfully')
	}
})

module.exports = connection
