/**
 * Confirm Controller
 */

// Components
import App from 'js/app/App';

App.controller('LoadingController', ['$rootScope', '$scope', '$timeout', ($rootScope, $scope, $timeout) => {
  // Config
  $scope.options = {
    isVisible: false,
    message: '',
  };
  $scope.optionsCopy = angular.copy($scope.options);

  $rootScope.$on('showLoader', (event, args) => {
    if (angular.isObject(args)) {
      for (let key in $scope.options) {
        if (args.hasOwnProperty(key)) {
          $scope.options[key] = args[key];
        }
      }
    }
    $timeout(() => {
      $scope.options.isVisible = true;
    });
  });

  $rootScope.$on('hideLoader', (event, args) => {
    $scope.options.isVisible = false;
    $timeout(() => {
      $scope.options = angular.copy($scope.optionsCopy);
    }, 300);
  });
}]);
a
