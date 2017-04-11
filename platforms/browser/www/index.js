
document.addEventListener('deviceready', function() {
	alert("Device is ready!");

	//PouchDB.plugin(PouchAdapterCordovaSqlite);

	var db;

	//if (ons.platform.isIOS() || ons.platform.isAndroid())
  		db = new PouchDB('app_rate.db');
  	//else
  	//	db = new PouchDB('app_rate.db');

  	var applicationRates = [
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

  	var message = (db.adapter ? '&#10003; PouchDB is working.' : '&#1007; PouchDB is not working');
  
  	document.write(message);

  	db.bulkDocs(applicationRates)
  		.then(function(result) {
  			console.log("Successful upload!");
  		})
  		.catch(function(error) {
  			console.log(error);
  		});
  	
  	
	/*db.put(rate_entry, function result(error, result) {
	  	if (!error) {
	  		alert("Entry created successfully!");
	  	}
	  	else {
	  		alert(error);
	  	}
	});

	db.allDocs({
		include_docs: true,
		keys: 
	})
	*/
	

  //function showTableData() {
  //	db.allDocs({include_docs: true, descending: true}, function(error, result) {
  //		console.table(result.rows);
  //	});
  //}
  
});