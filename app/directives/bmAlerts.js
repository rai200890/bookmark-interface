module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      bmItems: '='
    },
    template: require('../views/alerts.html'),
    controller: ['$scope', function($scope) {
      $scope.close = function(index) {
        $scope.bmItems.splice(index, 1);
      }
    }],
    link: function(scope, iElement, iAttrs, ctrl) {
    }
  }
}
