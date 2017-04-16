
document.addEventListener('deviceready', function() {
	alert("Device is ready!");

  //The following three statements relate to the database code from 
	//var appRatesDB;
 	//appRatesDB = new PouchDB('app_rate.db');
  //initData(appRatesDB);

  //var message = (appRatesDB.adapter ? '&#10003; PouchDB is working.' : '&#1007; PouchDB is not working');
  
  //document.write(message);

  //This code is for testing the database control code in appData,js
  //If successfull, this is the code that will be used.
  //fillDB();
  fillDB();

  //Manually bootstrap Angular when device is ready
  angular.element(document).ready(function() {
    var appElement = document.getElementById("deIceApp");
    angular.bootstrap(appElement, ['deIceApp']);
  });
  
}, false);

var deIceApp = angular.module('deIceApp',[]);
