  deIceApp.controller('calcCtrl', function($scope) {
      $scope.tempOptions = [ 
          { start: '1000', end: '1004', text: '30' },
          { start: '1005', end: '1008', text: '25-30'},
          { start: '1009', end: '1012', text: '20-25'},
          { start: '1013', end: '1016', text: '15-20'},
          { start: '1017', end: '1018', text: '0-15'},
          { start: '1019', end: '1019', text: '0'}
      ];
      $scope.forecasts = [
          { id: 'rising', text: "Rising" }, {id: 'falling',text: "Falling"}
      ];
      $scope.weather = [
          { id: 'snow', text: "Snow" }, { id: 'freezing rain' ,text: "Freezing Rain" }
      ];
      $scope.materialOptions = [
          { id: 'salt_brine', text: "Wetted salt: brine"}, 
          { id: 'salt_other', text: "Wetted salt: other"}, 
          { id: 'salt_dry', text: "Dry salt" },
          { id: 'sand', text: "Sand" }
      ];

      $scope.area = "100 sq. ft";

      $scope.applicationRate = "Enter info for application rates.";

      $scope.getRecord = function() {
        	 var start = $scope.formData.selectedTemp.start;
           var end = $scope.formData.selectedTemp.end;
           var forecast = $scope.formData.selectedForecast.id;
           var weather = $scope.formData.selectedWeather.id;
           var material = $scope.formData.selectedMaterial.id;

            getRate(start, end, forecast, weather, material);
      };

      function getRate(start, end, forecast, weather, material) {
          var db = new PouchDB('app_rate.db');
          alert("Material at beginning of getRate: " + material);

          db.allDocs({ include_docs: true, startkey: start, endkey: end}).then(function(result) {
              var results = result.rows;
              alert("Results: " + results.length);

              $scope.applicationRate = searchRates(material, 
                searchWeather(weather, 
                  searchForecast(forecast, results)
                )
              );

          }).catch(function(error) {
              alert("Found none many :(" + error);
          });
        }
  });