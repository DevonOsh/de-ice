deIceApp.controller('journalCtrl', function($scope) {
    getJournals();

    function getJournals() {
    //var db = new PouchDB('journal.db');
      var journals = [];

      jrnlDB.allDocs({ include_docs: true }).then(function(response) {

        journals = response.rows;

        $scope.$apply(function() {
          $scope.journals = journals;
        });

      }).catch(function(error) {
        alert(error);
      });
    }

    $scope.delete = function(jrnlDoc) {
      jrnlDB.get(jrnlDoc).then( (doc) => {
        return db.remove(doc);
      })
      .then( (result) => {
        alert("Record removed: " + result.ok);
        //$scope.$apply();
      })
      .catch( (error) => {
        console.log(error);
      });
    }
});

deIceApp.controller('journalEntryCtrl', function($scope, $location) {
    $scope.add = function() {
      $scope.journalData._id = new Date();
      //console.log($scope.journalData);   //FIXME remove
      addJournal($scope.journalData);
      $location.path("/journal");
    };
});