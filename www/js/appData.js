
	var ratesData = [
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
	 ];

	 function fillDB() {
	 	var db = new PouchDB('app_rate.db');
	 	var appRates = ratesData;
    var hasData = false;

	 	//Bulk load all the docs into the database
    db.get('1000').then(function(doc) {
        var docTemp = doc.temp;
        alert("The app has data, here's the temp: " + docTemp);
        getRate('1000', '1004'); 
    }).catch(function(error) {
        alert("No record found, fill that DB!");
    });

    //Bulk add the documents

    /*
	 	db.bulkDocs(appRates).then(function(result) {
  			alert("Successful upload!");
  	}).catch(function(error) {
  			alert(error);
  	});
    */

  		//Create the temps index for running queries on
      /*
  		var tempsIndex = {
  			_id: '_design/tempIndex',
  			views: {
  				'tempIndex': {
  					map: function(doc) { emit(doc.temp, doc.rates); }
  				}
  			}
  		};

  		//Save the index
  		db.put(tempsIndex).then(function() {
  			alert("Index created");
  		})
  		.catch(function(error) {
  			alert("Error creating index: " + error);
  		});
      */
	 }

	 function getRate(start, end) {
	 	var temp = "0-15";
	 	var db = new PouchDB('app_rate.db');
	 	var rates = {};

    db.allDocs({ include_docs: true, startkey: start, endkey: end}).then(function(result) {
        var results = result.rows;
        var numResults = results.length;
        var row = result.rows[3].doc;
        var appRate = row.rates.salt_wet_brine;

        alert("Found this many: " + numResults);
        alert("This is the application rate: " + appRate);
    }).catch(function(error) {
        alert("Found none many :(");
    });

	 	//Query the database using the index created
    /*
	 	db.query('tempIndex', {key: temp })
	 	.then(function(result) {
	 		rates = result;
	 		var saltWet = rates.selt_wet_brine;
	 		alert(saltWet);
	 	});
    */

	 }