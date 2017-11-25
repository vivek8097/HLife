angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.searchDisease', {
    url: '/search',
    views: {
      'side-menu21': {
        templateUrl: 'templates/searchDisease.html',
        controller: 'searchDiseaseCtrl'
      }
    }
  })

  .state('menu.checkDisease', {
    url: '/check',
    views: {
      'side-menu21': {
        templateUrl: 'templates/checkDisease.html',
        controller: 'checkDiseaseCtrl'
      }
    }
  })

  .state('menu.doctors', {
    url: '/doctors',
    views: {
      'side-menu21': {
        templateUrl: 'templates/doctors.html',
        controller: 'doctorsCtrl'
      }
    }
  })

  .state('menu.contact', {
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('details', {
    url: '/doctors/:docId',
    templateUrl: 'templates/Details.html',
    controller: 'detailsCtrl'
  })
  .state('sublocations', {
    url: '/check/:locaionId',
    templateUrl: 'templates/sublocations.html',
    controller: 'sublocationsCtrl'
  })
  .state('sublocationSymptoms', {
    url: '/check/:locaionId/:sublocationId/:selectorStatus',
    templateUrl: 'templates/sublocationSymptoms.html',
    controller: 'sublocationSymptomsCtrl'
  })
  .state('diagnose', {
    url: '/check/:locaionId/:sublocationId/:selectorStatus/:gender/:symptoms/:yearofbirth',
    templateUrl: 'templates/diagnose.html',
    controller: 'diagnoseCtrl'
  })
  .state('issueDetail', {
    url: '/search/:issueId',
    templateUrl: 'templates/issueDetail.html',
    controller: 'issueDetailCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});

