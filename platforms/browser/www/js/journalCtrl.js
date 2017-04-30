  deIceApp.controller('journalCtrl', function($scope) {
      getJournals();
  });

  deIceApp.controller('journalEntryCtrl', function($scope, $location) {
      $scope.journalData.date = new Date();
      $scope.addJournal = function() {
        alert($scope.journalData.temp);   //FIXME remove
        addJournal($scope.journalData);
        $location.path("/journal");
      };
  });