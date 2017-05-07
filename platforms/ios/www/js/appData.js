
  const rateDB = new PouchDB('app_rate.db');
  const jrnlDB = new PouchDB('journal.db');
  //Data used by application
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

   //Most database related functions

	 function checkDB() {
	 	//var db = new PouchDB('app_rate.db');
    var hasData = false;

	 	//Bulk load all the docs into the database
    rateDB.get('1000').then(function(doc) {
        //If this value starts changing, database may need to be cleared and reloaded
        var docTemp = doc.temp;
        console.log("Data in app_rate.db, first temp: " + docTemp);
    }).catch(function(error) {
        //If there is no record, fill the db for the first time
        fillDB(); 
    });
  }

  function fillDB() {
    //var db = new PouchDB('app_rate.db');
    var appRates = ratesData;

    rateDB.bulkDocs(appRates).then(function(result) {
        console.log("Successful upload of app data");
    }).catch(function(error) {
        alert(error);
    });
  }

  //Called from calcCtrl
  //Part of algorithm to search for application rate, searches forecasts
  function searchForecast(key, records) {
      alert("Searching forecasts..." + records.length);

      var foundRecords = [];
      for (var i=0; i < records.length; i++ ) {
        if (records[i].doc.forecast == key) {
          foundRecords.push(records[i]);
        }
      }
      return foundRecords;
  }

  //Called from calcCtrl
  //Part of algorithm to search for application rate, searches forecasts
  function searchWeather(key, records) {
      alert("Searching weather..." + records.length);
      var foundRecords = [];
      for (var i=0; i < records.length; i++ ) {
        if (records[i].doc.weather === key) {
          foundRecords.push(records[i]);
        }
      }
      return foundRecords;
  }

  //Called from calcCtrl
  //Part of algorithm to search for application rate, searches forecasts
  function searchRates(key, record) {
      console.log(record);
      var appRate;
      var rates = record[0].doc.rates;
      if(record.length = 0) {
        return null;
      }
      else {
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
  }

  function addJournal(data) {
      //var db = new PouchDB('journal.db');

      console.log("Object in addJournal: ");
      console.log(data);

      jrnlDB.put(data).then(function(response) {
        alert("Entry added ok? " + response.ok);
      }).catch(function(error) {
        alert(error);
      });

   }

   function deleteJournal(id) {
      alert("Write delete function.");
   }