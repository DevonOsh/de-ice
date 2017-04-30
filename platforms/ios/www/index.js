
document.addEventListener('deviceready', function() {
	alert("Device is ready!");

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


deIceApp.config(function($routeProvider, $locationProvider, $compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(http|ftp|mailto|file|tel):/);
  $locationProvider.hashPrefix('');

  $routeProvider
  .when("/", {
    templateUrl: "views/home.html"
  })
  .when("/calc", {
    templateUrl: 'views/calc.html',
    controller: "calcCtrl"
  })
  .when("/calcResult/:rate", {
    templateUrl: "",
    controller: "views/calcResult.html"
  })
  .when("/journal", {
    templateUrl: "views/journal.html",
    controller: "journalCtrl"
  })
  .when("/journalEntry", {
    templateUrl: "views/journalEntry.html",
    controller: "journalEntryCtrl"
  })
  .when("/learn", {
    templateUrl: "views/learn.html"
  })
  .otherwise({
    template: "<h1>No template found</h1>"
  });
});


