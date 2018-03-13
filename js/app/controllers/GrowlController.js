/**
 * Growl Controller
 */

// Components
import App from 'js/app/App';

App.controller('GrowlController', ['$rootScope', '$scope', '$timeout', '$window', ($rootScope, $scope, $timeout, $window) => {
  // Config
  let _expire = null;
  $scope.options = {
    isVisible: false,
    type: 'error',
    title: '',
    message: '',
    expire: false,
  };
  $scope.optionsCopy = angular.copy($scope.options);

  $scope.dismiss = (event) => {
    if (typeof event !== 'undefined') {
      event.preventDefault();
    }
    $timeout.cancel(_expire);
    $scope.options.isVisible = false;
  }

  $rootScope.$on('showGrowl', (event, args) => {
    $timeout.cancel(_expire);
    if (angular.isObject(args)) {
      for (let key in $scope.options) {
        if (args.hasOwnProperty(key)) {
          $scope.options[key] = args[key];
        }
      }
    }
    if ($scope.options.expire) {
      _expire = $timeout(() => {
        $scope.dismiss();
      }, $scope.options.expire);
    }

    $timeout(() => {
      $scope.options.isVisible = true;
    });
  });

  $rootScope.$on('hideGrowl', (event, args) => {
    $scope.options.isVisible = false;
    $timeout.cancel(_expire);
    $timeout(() => {
      $scope.optionsCopy = angular.copy($scope.options);
    });
  });
}]);
