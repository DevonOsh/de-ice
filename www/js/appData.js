var rateData = {
	ratesDB: new PouchDB('app_rate.db'),
	ratesData: [
  		{_id: '1000', temp: "30", forecast: "rising", weather: "snow",
  			rates: {salt_wet_brine: 0.75, salt_wet_other: 0.5, salt_dry: 0.75, sand: null}
  		},
  		{_id: '1002', temp: "30", forecast: "rising", weather: "freezing rain", 
  			rates: { salt_wet_brine: 1.25, salt_wet_other: 1.0, salt_dry: 1.5, sand: null }
  		},
  		{_id: '1003', temp: "30", forecast: "falling", weather: "snow", 
  			rates: { salt_wet_brine: 1.25, salt_wet_other: 1.0, salt_dry: 1.5, sand: null }
  		},
  		{_id: '1004', temp: "30", forecast: "falling", weather: "freezing rain", 
  			rates: { salt_wet_brine: 1.5, salt_wet_other: 1.25, salt_dry: 1.75, sand: null }
  		},
  		{_id: '1005', temp: "25-30", forecast: "rising", weather: "snow", 
  			rates: { salt_wet_brine: 1.25, salt_wet_other: 1.0, salt_dry: 1.5, sand: null }
  		},
  		{_id: '1005', temp: "25-30", forecast: "rising", weather: "freezing rain", 
  			rates: { salt_wet_brine: 1.5, salt_wet_other: 1.25, salt_dry: 1.75, sand: null }
  		},
  		{_id: '1007', temp: "25-30", forecast: "falling", weather: "snow", 
  			rates: { salt_wet_brine: 1.25, salt_wet_other: 1.0, salt_dry: 1.5, sand: null }
  		},
  		{_id: '1008', temp: "25-30", forecast: "falling", weather: "freezing rain", 
  			rates: { salt_wet_brine: 1.75, salt_wet_other: 1.5, salt_dry: 2.25, sand: 3.25 }
  		},
  		{_id: '1009', temp: "20-25", forecast: "rising", weather: "snow", 
  			rates: { salt_wet_brine: 1.75, salt_wet_other: 1.5, salt_dry: 2.25, sand: null }
  		},
  		{_id: '1010', temp: "20-25", forecast: "rising", weather: "freezing rain", 
  			rates: { salt_wet_brine: 1.75, salt_wet_other: 1.5, salt_dry: 2.25, sand: 3.25 }
  		},
  		{_id: '1011', temp: "20-25", forecast: "falling", weather: "snow", 
  			rates: { salt_wet_brine: 2.0, salt_wet_other: 2.0, salt_dry: 2.75, sand: null }
  		},
  		{_id: '1012', temp: "20-25", forecast: "falling", weather: "freezing rain", 
  			rates: { salt_wet_brine: 2.5, salt_wet_other: 2.0, salt_dry: 3.0, sand: 3.25 }
  		},
  		{_id: '1013', temp: "15-20", forecast: "rising", weather: "snow", 
  			rates: { salt_wet_brine: 2.0, salt_wet_other: 2.0, salt_dry: 2.75, sand: null }
  		},
  		{_id: '1014', temp: "15-20", forecast: "rising", weather: "freezing rain", 
  			rates: { salt_wet_brine: 2.5, salt_wet_other: 2.0, salt_dry: 3.0, sand: 3.25 }
  		},
  		{_id: '1015', temp: "15-20", forecast: "falling", weather: "snow", 
  			rates: { salt_wet_brine: 2.5, salt_wet_other: 2.0, salt_dry: 3.0, sand: null }
  		},
  		{_id: '1016', temp: "15-20", forecast: "falling", weather: "freezing rain", 
  			rates: { salt_wet_brine: 2.5, salt_wet_other: 2.0, salt_dry: 3.0, sand: 3.25 }
  		},
  		{_id: '1017', temp: "0-15", forecast: "rising", weather: "snow", 
  			rates: { salt_wet_brine: null, salt_wet_other: 3.0, salt_dry: null, sand: 5.0 }
  		},
  		{_id: '1018', temp: "0-15", forecast: "falling", weather: "snow", 
  			rates: { salt_wet_brine: null, salt_wet_other: 3.0, salt_dry: null, sand: 5.0 }
  		},
  		{_id: '1019', temp: "0", forecast: "rising", weather: "snow", 
  			rates: { salt_wet_brine: null, salt_wet_other: 4.5, salt_dry: null, sand: 5.0 }
  		}
	 ],
	 fillDB: function() {
	 	var db = this.ratesDB;
	 	var appRates = this.ratesData;

	 	//Bulk load all the docs into the database
	 	db.bulkDocs(appRates)
  		.then(function(result) {
  			alert("Successful upload!");
  		})
  		.catch(function(error) {
  			alert(error);
  		});

  		//Create the temps index for running queries on
  		var tempsIndex = {
  			_id: '_design/tempIndex',
  			views: {
  				'tempIndex': {
  					map: function(doc) { emit(doc.temp, doc.rates); }
  				}
  			}
  		}

  		//Save the index
  		db.put(tempsIndex)
  		.then(function() {
  			console.log("Index created");
  		})
  		.catch(function(error) {
  			console.log("Error creating index: " + error);
  		})
	 },
	 getRate: function() {
	 	var temp = "0-15";
	 	var db = this.ratesDB;

	 	//Query the database using the index created
	 	var rates = function() {
	 		return db.query('tempIndex', {key: temp });
	 	}

	 	alert(rates);
	 	//var rate => { db.query('tempIndex'. {key: temp}); }

	 }
}