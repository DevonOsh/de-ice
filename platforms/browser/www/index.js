
document.addEventListener('deviceready', function() {
	alert("Device is ready!");

	var appRatesDB;

 	appRatesDB = new PouchDB('app_rate.db');

  initData(appRatesDB);

  //var message = (appRatesDB.adapter ? '&#10003; PouchDB is working.' : '&#1007; PouchDB is not working');
  
  //document.write(message);

  /*
  appRatesDB.get('1015').then(function(doc) {
      var tempResult = doc.temp;
      alert(tempResult);
  }).catch(function(error) {
      alert(error);
  });
  */
  var deIceApp = angular.module('deIceApp',[]);

  deIceApp.controller('calcCtrl', ['$scope', function($scope) {
      $scope.temps = ["30", "25-30", "20-25", "15-20", "0-15", "0"];
      //$scope.forecasts = ["Rising", "Falling"];
      //$scope.weather = ["Snow", "Freezing Rain"];
      //$scope.material = ["Wetted salt: brine", "Wetted salt:other", "Dry salt", "Sand"];
      $scope.area = "100 sq. ft";
  }]);

  deIceApp.controller('');
  
});
