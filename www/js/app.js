// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'angular-loading-bar', 'ngAnimate'])
//angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'ngCordova','angular-loading-bar', 'ngAnimate'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  
  .state('app2', {
    url: '/app2',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
   .state('app.search', {
     url: '/search',
     views: {
       'menuContent': {
         templateUrl: 'templates/search.html'
       }
     }
   })
    // setup an abstract state for the tabs directive
    // .state('tab', {
    //   url: '/tab',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html'
    // })
  
  // .state('app.bromwse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html'
  //       }
  //     }
  //   })

    .state('app.pet', {
      url: '/pet/:pethtmlLink',
      views: {
       // 'pets-tab': {
          'menuContent': {
          templateUrl: 'templates/calendar.html',
          controller: 'WebViewCtrl'
        }
      //}
      }
    })

       .state('app.about', {
       url: '/about',
       views: {
         'about-tab': {
           templateUrl: 'templates/about.html'
         }
       }
     })
  
  .state('app.single', {
    url: '/main/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
