var express = require('express');
var router = express.Router();
var Store = require("jfs");
var db = new Store("data",{pretty:true});

/* GET users listing. */
router.get('/:query', function(req, res, next) {
	var obj = db.getSync("airports");
    var query = req.params.query
    var result = {
        "airports":[]
    };
    	obj.airports.map(function(airport){
    		if(airport.name.indexOf(query)> -1 || airport.city.indexOf(query)>-1 || airport.countryname.indexOf(query)>-1){
    		    result.airports.push(airport);
    		}
    	});
    res.send(result);
});

module.exports = router;
