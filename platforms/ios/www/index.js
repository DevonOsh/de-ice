
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

  //Manually bootstrap Angular when device is ready
  angular.element(document).ready(function() {
    var appElement = document.getElementById("deIceApp");
    angular.bootstrap(appElement, ['deIceApp']);
  });
  
}, false);

var deIceApp = angular.module('deIceApp',[]);
