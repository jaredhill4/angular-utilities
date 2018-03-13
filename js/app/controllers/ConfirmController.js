/**
 * Confirm Controller
 */

// Components
import App from 'js/app/App';

App.controller('ConfirmController', ['$rootScope', '$scope', '$timeout', ($rootScope, $scope, $timeout) => {
  // Config
  $scope.options = {
    isVisible: false,
    message: 'Are you sure?',
    size: 'medium',
    okText: 'OK',
    denyText: 'Cancel',
  };
  $scope.optionsCopy = angular.copy($scope.options);

  // Handle action click
  $scope.handleActionClick = (event, action) => {
    event.preventDefault();
    $rootScope.$broadcast('confirmActionChosen', { success: action });
    $scope.options.isVisible = false;
  };

  $rootScope.$on('showConfirm', (event, args) => {
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

  $rootScope.$on('confirmHidden', (event, args) => {
    $scope.optionsCopy = angular.copy($scope.options);
  });
}]);
