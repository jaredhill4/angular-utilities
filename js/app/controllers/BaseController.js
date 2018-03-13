/**
 * Base Controller
 */

// Components
import App from 'js/app/App';
import UtilService from 'js/app/services/UtilService';

App.controller('BaseController', ['$scope', 'UtilService', ($scope, UtilService) => {
  // Trigger confirm
  $scope.triggerConfirm = (event) => {
    event.preventDefault();
    let options = {
      message: 'Are you sure you want to do that?',
      size: 'medium',
      okText: `Yes, I'm sure`,
      denyText: `No, don't!`,
    };

    UtilService.confirm(options, (resp) => {
      console.log('The action was confirmed.');
    }, (resp) => {
      console.log('The action was denied.');
    });
  };

  // Trigger growl
  $scope.triggerGrowl = (event) => {
    event.preventDefault();
    let options = {
      type: 'success',
      title: 'This is a growl message.',
      message: 'This is a little more explanation about the growl message.',
      expire: 10000,
    };

    UtilService.growl('show', options);
  };

  // Trigger loading
  $scope.triggerLoading = (event) => {
    event.preventDefault();
    let options = {
      message: 'Loading...'
    };

    UtilService.loading('show', options);
  };
}]);
