
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

	 function checkDB() {
	 	var db = new PouchDB('app_rate.db');
    var hasData = false;

	 	//Bulk load all the docs into the database
    db.get('1000').then(function(doc) {
        var docTemp = doc.temp;
        alert("The app has data, here's the temp: " + docTemp);
    }).catch(function(error) {
        alert("No record found, fill that DB!");
        fillDB(); 
    });
  }

  function fillDB() {
    var db = new PouchDB('app_rate.db');
    var appRates = ratesData;

    db.bulkDocs(appRates).then(function(result) {
        alert("Successful upload!");
    }).catch(function(error) {
        alert(error);
    });
  }

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

	 function getRate(start, end, forecast, weather, material) {
    	 	var db = new PouchDB('app_rate.db');
        var finalRate;

        db.allDocs({ include_docs: true, startkey: start, endkey: end}).then(function(result) {
            var results = result.rows;
            alert("Results: " + results.length);

            finalRate = searchRates(material, 
              searchWeather(weather, 
                searchForecast(forecast, results)
              )
            );
        }).catch(function(error) {
            alert("Found none many :(" + error);
        });

        function searchForecast(key, records) {
          alert("Searching forecasts...");

          var foundRecords = [];
          for (var i=0; i < records.length; i++ ) {
            if (records[i].doc.forecast == key) {
              foundRecords.push(records[i]);
            }
          }
          alert(foundRecords.length);
          return foundRecords;
        }

        function searchWeather(key, records) {
          alert("Searching weather..." + records.length);
          var foundRecords = [];
          for (var i=0; i < records.length; i++ ) {
            if (records[i].doc.weather === key) {
              foundRecords.push(records[i]);
            }
          }
          alert(foundRecords.length);
          return foundRecords;
        }

        function searchRates(key, record) {
          var appRate;
          var rates = record.rates;
          if (key === 'salt_brine') {
            appRate = rates.salt_wet_brine;
          }
          if (key === 'salt_other') {
            appRate = rates.salt_wet_other;
          }
          if (key === 'salt_dry') {
            appRate = rates.salt_dry;
          }
          if (key === 'sand') {
            appRate = rates.sand;
          }

          return appRate;
        }

        return finalRate;
	 }

   function addJournal(data) {
      var db = new PouchDB('journal.db');

      db.post(data).then(function(reponse) {
        alert(response);
      }).catch(function(error) {
        alert(error);
      });

   }

   //FIXME
   function getJournals() {
      var db = new PouchDB('journal.db');
      var journals = [];

      db.allDocs({ include_docs: true }).then(function(response) {
        journals = response.rows;
        return journals;
      }).catch(function(error) {
        alert(error);
      });
   }

   function deleteJournal(id) {
      alert("Write delete fucntion.");
   }