  deIceApp.controller('calcCtrl', function($scope) {
      $scope.temps = [ 
          { start: '1000', end: '1004', text: '30' },
          { start: '1005', end: '1008', text: '25-30'}
          { start: '1009', end: '1012', text: '20-25'}
          { start: '1013', end: '1016', text: '15-20'}
          { start: '1017', end: '1018', text: '0-15'}
          { start: '1019', end: '1019', text: '0'}
      ];
      $scope.forecasts = ["Rising", "Falling"];
      $scope.weather = ["Snow", "Freezing Rain"];
      $scope.material = ["Wetted salt: brine", "Wetted salt:other", "Dry salt", "Sand"];
      $scope.area = "100 sq. ft";

      var data = $scope.formData;

      $scope.getRecord = function() {
      	
      }
  });