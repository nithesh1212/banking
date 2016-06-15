var express = require('express');
var router = express.Router();
var Store = require("jfs");
var db = new Store("data",{pretty:true});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	var date = req.query.date
	var obj = db.getSync("flight");
	var isRecordFound = false;
    	obj.flights.map(function(flight){
    		if(flight.id.toLowerCase()===(req.params.id).toLowerCase() && flight.departure_date === date){
    			isRecordFound = true;
    			res.send(flight);
    		}
    	});
    	if(!isRecordFound){
    		res.send({"message":"No Record Found"});
    	}
});

router.get('/book/search', function(req, res, next) {
	var date = req.query.date
	var departure = req.query.departure;
	var arrival = req.query.arrival;
	var obj = db.getSync("book-a-flight");
	var result = {
        "flights":[]
    };
    	obj.flights.map(function(flight){
    		if(flight.departuredate === date && flight.departureairport.code === departure && flight.arrivalairport.code === arrival){
    			result.flights.push(flight);
    		}
    	});
    res.send(result);
    	
});

router.post('/:modal', function(req, res, next){
	var modal = req.params.modal;
	var d = req.body;

	console.log(modal);
	db.saveSync(modal, d, function(err){
 	   console.log('Data stored succesfully.....');
	});
	res.send(db.getSync(modal));
});

module.exports = router;
