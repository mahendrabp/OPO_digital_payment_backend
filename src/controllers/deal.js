const uuidv4 = require('uuid/v4');

// import required files
const dealModels = require('../models/Deal');

console.log('controller'); // where I am

module.exports = {

	readAllDeal: function(request, response) {
		dealModels.readAll()
		.then(result => {
			response.status(200).json({
				status: 200,
				error: false,
				message: 'Get all deals successfully',
				result,
			})
		})
		.catch(error => {
			response.status(404).json({
				status: 404,
				error: true,
				message: 'Can not get all deals',
				result: error,
			})
		})
	},

	createDeal: function(request, response) {
		const createData = {};
		for (o in request.body) {
      if (Object.hasOwnProperty.call(request.body, o)) {
        createData[o] = request.body[o];
      }
    }

    // validation
    if ('title' in createData &&
			'merchant_id' in createData &&
    	'category_id' in createData &&
    	'date_start' in createData &&
    	'date_end' in createData &&
    	'type' in createData
    ) {

    	// create
    	createData['id'] = uuidv4()

    	dealModels.create(createData)
			.then(result => {
				response.status(201).json({
					status: 201,
					error: false,
					message: 'Create deal successfully',
					result: createData,
				})
			})
			.catch(error => {
				response.status(400).json({
					status: 400,
					error: true,
					message: 'Can not create deal',
					result: error,
				})
			})

    } else {
    	return response.status(201).json({
        status: 201,
        error: true,
        message: 'There is must be filled form that left blank',
        result: createData,
      });
    }
	},

	readDeal: function(request, response) {
		const { dealId } = request.params
		dealModels.read(dealId)
		.then(result => {
			response.status(200).json({
				status: 200,
				error: false,
				message: 'Get deal with id: ' + dealId + ' successfully',
				result,
			})
		})
		.catch(error => {
			response.status(404).json({
				status: 404,
				error: true,
				message: 'Can not find deal with id: ' + dealId,
				result: error,
			})
		})
	},

	updateDeal: function(request, response) {
		const { dealId } = request.params

		const updateData = {};
		for (o in request.body) {
      if (Object.hasOwnProperty.call(request.body, o)) {
        updateData[o] = request.body[o];
      }
    }

		dealModels.update(dealId, updateData)
		.then(result => {
			response.status(200).json({
				status: 200,
				error: false,
				message: 'Update deal with id: ' + dealId + ' successfully',
				result: updateData,
			})
		})
		.catch(error => {
			response.status(400).json({
				status: 400,
				error: true,
				message: 'Can not update deal with id: ' + dealId,
				result: error,
			})
		})
	},

	deleteDeal: function(request, response) {
		const { dealId } = request.params
		dealModels.delete(dealId)
		.then(result => {
			response.status(200).json({
				status: 200,
				error: false,
				message: 'Delete deal with id: ' + dealId + ' successfully',
				result: {
					dealId
				},
			})
		})
		.catch(error => {
			response.status(404).json({
				status: 404,
				error: true,
				message: 'Can not delete deal with id: ' + dealId,
				result: error,
			})
		})
	},
}
