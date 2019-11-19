const connection = require('../config/db')

module.exports = {

	readAll: function() {
    return new Promise(function(resolve, reject) {
			const query = 'SELECT * FROM deals'
			connection.query(query, function(error, result) {
				if (!error) {
					resolve(result)
				} else {
					reject(error)
				}
			})
		})
	},

	read: function(dealId) {
		return new Promise( function(resolve, reject) {
			const query = `SELECT * FROM deals where id = '${dealId}'`
			connection.query(query, function(error, result) {
				if (!error) {
					resolve(result)
				} else {
					reject(error)
				}
			})
		})
	},

	create: function(createData) {
		return new Promise( function(resolve, reject) {
			const query = 'INSERT INTO deals SET ?'
			connection.query(query, createData, function(error, result) {
				if (!error) {
					resolve(result)
				} else {
					reject(error)
				}
			})
		})
	},

	update: function(dealId, updateData) {
		return new Promise( function(resolve, reject) {
			const query = `UPDATE deals SET ? WHERE id = '${dealId}'`
			connection.query(query, updateData, function(error, result) {
				if (!error) {
					resolve(result)
				} else {
					reject(error)
				}
			})
		})
	},

	delete: function(dealId) {
		return new Promise( function(resolve, reject) {
			const query = `DELETE FROM deals WHERE id = '${dealId}'`
			connection.query(query, function(error, result) {
				if (!error) {
					resolve(result)
				} else {
					reject(error)
				}
			})
		})
	},
}
