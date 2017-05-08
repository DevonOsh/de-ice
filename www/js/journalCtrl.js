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

    $scope.delete = function(jrnlID) {
      jrnlDB.get(jrnlID).then( (doc) => {
        return jrnlDB.remove(doc);
      })
      .then( (result) => {
        alert("Record removed: " + result.ok);
        //$scope.$apply();
        getJournals();
      })
      .catch( (error) => {
        console.log(error);
      });
    }
});

deIceApp.controller('journalEntryCtrl', function($scope, $location) {
    $scope.temps = ['30', '25-30', '20-25', '15-20', '0-15', '-0'];
    $scope.materials = ['Wetted salt: brine', 'Wetted salt: other', 'Dry salt', 'Sand'];
    $scope.journalDate = new Date();
    $scope.add = function() {
      $scope.journalData._id = $scope.journalDate;
      //console.log($scope.journalData);   //FIXME remove
      addJournal($scope.journalData);
      $location.path("/journal");
    };
});

deIceApp.controller('journalViewCtrl', function($scope, $routeParams, $location) {
  var jrnlID = $routeParams.id;

  getJournal();

  function getJournal() {
    jrnlDB.get(jrnlID).then( (doc) => {
      $scope.$apply(() => {
        $scope.journalData = doc;
        $scope.journalDate = doc._id;
      });
    })
    .catch( (err) => {
      console.log(err);
    });
  }
})