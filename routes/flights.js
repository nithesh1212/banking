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
	var departure = req.query.from;
	var arrival = req.query.to;
	var returndate = req.query.returndate;
	var obj = db.getSync("book-a-flight");
	var result = {
        "flights":[]
    };
    	obj.flights.map(function(flight){
    		if(flight.date === date && flight.departureairport.code === from && flight.arrivalairport.code === to){
    			//flight.type = "going";
    			result.flights.push(flight);
    		} /*else if(flight.date === date && flight.departureairport.code === to && flight.arrivalairport.code === from){
               flight.type = "return";
               result.flights.push(flight);
    		}*/
    	});
    res.send(result);
    	
});

router.get('/instance/:id', function(req, res, next) {
	var obj = db.getSync("book-a-flight");
	var id = req.params.id
	
    	obj.flights.map(function(flight){
    		if(flight.id === id){
    		    res.send(flight);		
    		}
    	}); 	
});

router.post('/book/ticket', function(req, res, next) {
	var payload = req.body
	var obj = db.getSync("book-a-flight");
	  obj.flights.map(function(flight){
    		if(flight.id === payload.id){
    		    res.send(flight);
    		}
    	});	
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
