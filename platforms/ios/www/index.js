
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
  checkDB();

  //Manually bootstrap Angular when device is ready
  angular.element(document).ready(function() {
    var appElement = document.getElementById("deIceApp");
    angular.bootstrap(appElement, ['deIceApp']);
  });
  
}, false);

var deIceApp = angular.module('deIceApp',["ngRoute"]);


//deIceApp.config(['$locationProvider', function($locationProvider) {
 // $locationProvider.hashPrefix('');
//}]);


deIceApp.config(function($routeProvider, $locationProvider, $compileProvider){
$compileProvider.aHrefSanitizationWhitelist(/^\s*(http|ftp|mailto|file|tel):/);
//$locationProvider.hashPrefix('');

  $routeProvider
  .when("/", {
    templateUrl: 'views/calculationForm.html',
    controller: "calcCtrl"
  })
  .when("/journal", {
    template: "views/journal.html",
    controller: "journalCtrl"
  })
  .when("/journalEntry", {
    template: "views/journalEntry.html",
    controller: "journalEntryCtrl"
  })
  .when("/learn", {
    template: "views/learn.html"
  })
  .otherwise({
    template: "<h1>No template found</h1>"
    //templateUrl: 'views/calculationForm.html',
    //controller: "calcCtrl"
  });
});


