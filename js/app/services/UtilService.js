/**
 * Utility methods
 */

// Components
import App from 'js/app/App';

App.factory('UtilService', ['$rootScope', ($rootScope) => {
  return {
    confirm: (options, confirmed, denied) => {
      $rootScope.$broadcast('showConfirm', options);

      $rootScope.$on('confirmActionChosen', (event, args) => {
        if (args.success) {
          if (angular.isFunction(confirmed)) {
            return confirmed(args);
            $rootScope.$broadcast('confirmComplete');
          }
        } else {
          if (angular.isFunction(denied)) {
            return denied(args);
            $rootScope.$broadcast('confirmComplete');
          }
        }
      });
    },
    loading: (action, options) => {
      switch (action) {
        case 'show':
          $rootScope.$broadcast('showLoader', options);
          break;
        case 'hide':
          $rootScope.$broadcast('hideLoader');
          break;
        default:
          console.error('Util Service -> Loading -> Parameter "action" not defined.');
          break;
      }
    },
    growl: (action, options) => {
      switch (action) {
        case 'show':
          $rootScope.$broadcast('showGrowl', options);
          break;
        case 'hide':
          $rootScope.$broadcast('hideGrowl');
          break;
        default:
          console.error('Util Service -> Growl -> Parameter "action" not defined.');
          break;
      }
    },
  }
}]);
