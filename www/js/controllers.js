angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, $state, $window, cfpLoadingBar, PetService) {
	var events = [];
	var array = [];
	var today = new Date();
	var vdate = new Date();
	var index = 0;
	var count,month,yr = 0;
	$scope.months=[];
    $scope.activeMonth = function(month) {
        console.log(month);
    }
	// PREPARE THE MONTH LINKS IN THE SIDE-MENU
	for(i=1; i<=12; i++) {
	Date.prototype.nextMonth = nextMonth;
	month = vdate.toLocaleString("en-us", { month: "short" });
	yr = vdate.getFullYear();
	$scope.months.push({name:month, year:yr, num:vdate.getMonth()});

	vdate.nextMonth();
	}

		function nextMonth(){
			var thisMonth = this.getMonth();
			this.setMonth(thisMonth+1);
			if(this.getMonth() != thisMonth+1 && this.getMonth() != 0)
				this.setDate(0);
		}
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//PULL REFRESH METHOD
  $scope.doRefresh = function() {
    $http.get('/PetIndexCtrl')
     .success(function(newItems) {
     })
     .finally(function() {
       //$scope.pets = null;
       //$state.go($state.current, {}, {reload: true});
	$window.location.reload(true);

       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
	if(!angular.isUndefined($rootScope.pets)) {
	   return $rootScope.pets;
	}
 else {
        var api = "https://www.googleapis.com/calendar/v3/calendars/h5u8avc730714t43rb5gbod1ms@group.calendar.google.com/events?singleEvents=True&orderBy=startTime&sortorder=ascending&timeMin=";
        api =  api.concat(today.toISOString());
    	var req = api.concat("&key=AIzaSyC-Z0ZvCbH2Rr-9K0rEniclGBuGDdNUyWA&callback=JSON_CALLBACK");  
        $http.jsonp(req)
             .success(function(data){
				var events = angular.fromJson(data);
				for(i in events['items']) {
		           	item = events['items'][i];
		           	item.Id = i;
			   		var date = getDateFromItem(item);
		            var d = date.getTime();
		            var t = today.getTime();
			   		//only future events
			    	if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth()) {
			    		item.date = date.toDateString() + ' ' + date.toLocaleTimeString();

			          array[index++] = item;
			    	}
		        }
   	    		$rootScope.pets = array;//bubbleSort(array);
   	    		PetService.set($rootScope.pets);

		        function getDateFromItem(item){
		           var date = new Date(item.startTime);
				   if(isNaN(date.getTime())) {
					date = new Date(item.start.dateTime);
				   }
					return date;
				};
// 		function bubbleSort(values) {
// 		  var length = values.length - 1;
// 		  do {
// 		    var swapped = false;
// 		    for(var i = 0; i < length; ++i) {
// 		      date1 = getDateFromItem(values[i]);
// 		      date2 = getDateFromItem(values[i+1]);
// 		      if (date1 > date2) {
// 		        var temp = values[i];
// 		        values[i] = values[i+1];
// 		        values[i+1] = temp;
// 		        swapped = true;
// 		      }
// 		    }
// 		  }
//   while(swapped == true)
//   return values;
// };
    }).error(function(data){
    	alert("Cannot connect to Google.  Please verify you are connected to a network.  Then PULL Down to REFRESH");
    });
}
    
    
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Open the login modal
  $scope.test = function() {
    alert("hello")
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $rootScope, $stateParams, PetService) {

 $rootScope.pet = PetService.get($stateParams.petId);
})


 .controller('WebViewCtrl', function($ionicPlatform, $scope, $rootScope,/* $cordovaDevice,/* $cordovaInAppBrowser, */PetService, $stateParams) {

 $rootScope.pet = PetService.get($stateParams.pethtmlLink);
  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
  $scope.doClick = function () {
  	var title 	 = $scope.pet.summary;
  	var location = $scope.pet.location;
  	var notes 	 = $scope.pet.notes;
  	var date 	 = $scope.pet.date;
  	var notes	 = $scope.pet.description;
  	var date 	 = new Date(date);
	var year 	 = date.getFullYear(), month = date.getMonth(), day = date.getDate(), hour = date.getHours(), min = date.getMinutes();

	if (day < 10) day = "0" + day;
	var formattedDate = new Date(year, month, day,hour,min,0,0);

  	var success	 = "Event Created";
  	var error 	 = "Error creating ";
  	$ionicPlatform.ready(function() {
	var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
	calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder (alarm)
	calOptions.secondReminderMinutes = 5;

		  // Added these options in version 4.2.4:
//		  calOptions.recurrence = "monthly"; // supported are: daily, weekly, monthly, yearly
//		  calOptions.recurrenceEndDate = new Date(2015,10,1,0,0,0,0,0); // leave null to add events into infinity and beyond calOptions.calendarName = "MyCreatedCalendar"; // iOS only
    calOptions.calendarId = 1; // Android only, use id obtained from listCalendars() call which is described below. This will be ignored on iOS in favor of calendarName and vice versa. Default: 1.

		  // And the URL can be passed since 4.3.2 (will be appended to the notes on Android as there doesn't seem to be a sep field)
    calOptions.url = "https://www.google.com";
    window.plugins.calendar.createEventInteractively(title,location,notes,formattedDate,formattedDate,calOptions, success,error);
	})
  }
 });
