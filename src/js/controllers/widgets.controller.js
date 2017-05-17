angular
.module('wdi-group-project')
.controller('WidgetsIndexCtrl', WidgetsIndexCtrl)
.controller('WidgetsNewCtrl', WidgetsNewCtrl);

// finds only the widgets belonging to the logged in user
WidgetsIndexCtrl.$inject = ['Widget', 'CurrentUserService'];
function WidgetsIndexCtrl(Widget, CurrentUserService) {
  const vm = this;
  if (CurrentUserService.currentUser) {
    vm.user = CurrentUserService.currentUser._id;
    vm.all = [];
    Widget
    .query({ 'user': vm.user })
    .$promise
    .then(widgets => {
      vm.all = widgets;
console.log(vm.all)
    });
  }
  vm.nextItem = nextItem;
  vm.newButton = {
    sizeY: 1, sizeX: 1, maxSizeY: 1, maxSizeX: 1
  };
  vm.newButtonOpts = {
    resizable: { enabled: false }
  };

  function nextItem(item) {
    console.log(item.index);
    if (item.type === 'giphy') {
      if (item.index+1 === item.data.data.length) {
        item.index = 0;
      } else item.index++;
    } else if (item.type === 'news') {
      if (item.index+1 === item.data.articles.length) {
        item.index = 0;
      } else item.index++;
    }
  }

  vm.icons = {
    sunny: { url: '/images/weather-icons/sunny.png' },
    cloudy: { url: '/images/weather-icons/cloudy.png' },
    rain: { url: '/images/weather-icons/rain.png' }
  };

  vm.delete = function widgetsDelete(widget) {
    vm.all.splice(vm.all.indexOf(widget), 1);
    Widget.remove({ id: widget._id });
  };
  vm.newCancel = false;
  vm.newIsHidden = true;
  vm.newWidget = function newWidget() {
    console.log('clicked');
    if (vm.newIsHidden) {
      vm.newIsHidden = false;
      vm.newCancel = true;
    } else {
      vm.newIsHidden = true;
      vm.newCancel = false;
    }
    console.log(vm.newIsHidden);
  };

  vm.update = function widgetsUpdate(widget, index) {
    console.log('WIDGET: ', widget);
    console.log('INDEX: ', index);
    Widget
      .update({ id: widget._id }, vm[index])
      .$promise
      .then(() => {
      });
  };

  vm.widgetUpdatePos = function widgetUpdatePos(widget) {
    const index = vm.all.indexOf(widget);
    // console.log(vm.all[index]);
    // ONLY update the position/size
    Widget
    .update({ id: widget._id }, {
      sizeX: vm.all[index].sizeX,
      sizeY: vm.all[index].sizeY,
      row: vm.all[index].row,
      col: vm.all[index].col
    });

  };

  vm.gridsterOpts = {
    mobileBreakPoint: 700,
    margins: [5, 5], // the pixel distance between each widget
    outerMargin: false,
    resizable: {
      enabled: true,
      handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
      start: function(event, $element, widget) {}, // optional callback fired when resize is started,
      resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
      stop: function(event, $element, widget) {
        // console.log(widget._id, widget.sizeX, widget.sizeY);
        vm.widgetUpdatePos(widget);
      } // optional callback fired when item is finished resizing
    },
    draggable: {
      start: function(event, $element, widget) {}, // optional callback fired when drag is started,
      drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
      stop: function(event, $element, widget) {
        // console.log(widget._id, widget.row, widget.col);
        vm.widgetUpdatePos(widget);
      } // optional callback fired when item is finished dragging
    }
  };
}

WidgetsNewCtrl.$inject = ['$state', 'Widget', 'CurrentUserService'];
function WidgetsNewCtrl($state, Widget, CurrentUserService) {
  const vm = this;
  vm.create = widgetsCreate;
  vm.widget = {};
  vm.widget.data = {};
  vm.widget.index = 0;
  vm.widget.user = CurrentUserService.currentUser._id;
  function widgetsCreate() {
    Widget
    .save(vm.widget)
    .$promise
    .then(() => {
      console.log(vm.widget);
      $state.go('widgetsIndex');
    });
  }
  vm.options = [
    { type: 'news', name: 'News' },
    { type: 'weather', name: 'Weather' },
    { type: 'giphy', name: 'Giphy' },
    { type: 'events', name: 'Events' },
    { type: 'chuck', name: 'Chuck Norris Jokes' },
    { type: 'recipes', name: 'Recipes' },
    { type: 'ron', name: 'Ron Swanson Quotes' },
    { type: 'quote', name: 'Random Quote' },
    { type: 'advice', name: 'Advice' },
    { type: 'today', name: 'This Day in History' }
  ];

  // News
  vm.newsWidget = {};
  vm.newsOptions = [
    { source: 'abc-news-au', name: 'ABC' },
    { source: 'bbc-sport', name: 'BBC Sport' }
  ];
  vm.test = test;
  function test() {
    vm.newsApi = `https://newsapi.org/v1/articles?source=${vm.newsWidget.source}&apiKey=902a003f156c4002995eb5a6c8267b0a`;
  }

  // Events
  vm.eventsWidget = {};
  vm.eventsLocation = [
    { city: 'London' },
    { city: 'Paris' },
    { city: 'New York' },
    { city: 'Lisbon' }
  ];
  vm.eventsType = [
    { id: 'music', type: 'Concerts & Tour Dates' },
    { id: 'conference', type: 'Conferences & Tradeshows' },
    { id: 'comedy', type: 'Comedy' },
    { id: 'learning_education', type: 'Education' },
    { id: 'family_fun_kids', type: 'Kids & Family' },
    { id: 'festivals_parades', type: 'Festivals' },
    { id: 'movies_film', type: 'Film' },
    { id: 'food', type: 'Food & Wine' },
    { id: 'fundraisers', type: 'Fundraising & Charity' },
    { id: 'art', type: 'Art Galleries & Exhibits' },
    { id: 'support', type: 'Health & Wellness' },
    { id: 'holiday', type: 'Holiday' },
    { id: 'books', type: 'Literary & Books' },
    { id: 'attractions', type: 'Museums & Attractions' },
    { id: 'community', type: 'Neighborhood' },
    { id: 'singles_social', type: 'Nightlife & Singles' },
    { id: 'schools_alumni', type: 'University & Alumni' },
    { id: 'clubs_associations', type: 'Organizations & Meetups' },
    { id: 'outdoors_recreation', type: 'Outdoors & Recreation' },
    { id: 'performing_arts', type: 'Performing Arts' },
    { id: 'animals', type: 'Pets' },
    { id: 'politics_activism', type: 'Politics & Activism' },
    { id: 'sales', type: 'Sales & Retail' },
    { id: 'science', type: 'Science' },
    { id: 'sports', type: 'Sports' },
    { id: 'technology', type: 'Technology' },
    { id: 'other', type: 'Other & Miscellaneous' }
  ];
  vm.eventsTime = [
    { time: 'All' },
    { time: 'Future' },
    { time: 'Past' },
    { time: 'Today' },
    { time: 'Last Week' },
    { time: 'This Week' },
    { time: 'Next Week' }
  ];
  vm.time = '';

  vm.events = events;
  function events() {
<<<<<<< HEAD
    const event = vm.eventsWidget.type;
    const location = vm.eventsWidget.location.city;
    const time = vm.eventsWidget.time.time;
    vm.widget.url = `http://api.eventful.com/json/events/search?${event}&location=${location}&t=${time}&app_key=BKn3H5D8pC7vHPP3`;
    console.log(vm.widget.url);
// var regex = /(<([^>]+)>)/ig

    // vm.eventsDescription = eventsDescription();
    // function eventsDescription(e) {
    //   e.replace('<br>', '');
    // }
  }





=======
    vm.eventOpts.url = `http://api.eventful.com/json/events/search?${vm.eventsType}&location=${vm.eventOpts.location}&app_key=BKn3H5D8pC7vHPP3`;
  }

  // sets parameters for the widget when the type dropdown is changed
>>>>>>> development
  vm.onChange = onChange;
  function onChange(option) {
    console.log('changed', option);
    switch (option) {
      case 'chuck': vm.widget.url = 'https://api.chucknorris.io/jokes/random';
        break;
      case 'advice': vm.widget.url = 'http://api.adviceslip.com/advice';
        break;
      case 'news': vm.widget.minSizeX = 2; vm.widget.minSizeY = 2; vm.widget.sizeX = 2; vm.widget.sizeY = 2;
        break;
      case 'today': vm.widget.url = 'http://history.muffinlabs.com/date';
        break;
      case 'ron': vm.widget.url = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
        break;
      case 'quote': vm.widget.url = 'http://quotesondesign.com/wp-json/posts?filter=rand&filter=1';
        break;
      case 'giphy': vm.widget.sizeX = 2; vm.widget.sizeY = 2;
        break;
      case 'weather': vm.widget.sizeX = 2; vm.widget.sizeY = 1;
        break;
      default: break;
    }
  }
  vm.giphySearchTerms = '';
  vm.giphySearch = giphySearch;

  function giphySearch() {
    let search = vm.giphySearchTerms;
    search = search.split(' ').join('+');
    vm.widget.url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC`;
  }

  vm.weatherLocation = null;
  vm.getWeather = function getWeather() {
    const location = vm.weatherLocation;
    vm.widget.url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=d2c4c1492a04ec9081fe74119400cc6e`;
  };

  vm.newsWidget = {};
  vm.newsSourceOptions = [
    { source: 'abc-news-au', name: 'ABC' },
    { source: 'bild', name: 'Bild' },
    { source: 'bbc-sport', name: 'BBC Sport' },
    { source: 'bbc-news', name: 'BBC News' },
    { source: 'al-jazeera-english', name: 'Al Jazeera English' },
    { source: 'bloomberg', name: 'Bloomberg' },
    { source: 'cnn', name: 'CNN' },
    { source: 'business-insider-uk', name: 'Business Insider (UK)' },
    { source: 'cnbc', name: 'CNBC' },
    { source: 'time', name: 'Time' },
    { source: 'hacker-news', name: 'Hacker News' },
    { source: 'the-washington-post', name: 'The Washington Post' },
    { source: 'the-new-york-times', name: 'The New York Times' },
    { source: 'the-lad-bible', name: 'The Lad Bible' },
    { source: 'espn', name: 'ESPN' },
    { source: 'usa-today', name: 'USA Today' },
    { source: 'the-huffington-post', name: 'The Huffington Post' },
    { source: 'techcrunch', name: 'TechCrunch' },
    { source: 'the-economist', name: 'The Economist' },
    { source: 'the-guardian-au', name: 'The Guardian (AU)' },
    { source: 'reddit-r-all', name: 'Reddit' },
    { source: 'polygon', name: 'Polygon' },
    { source: 'mtv-news', name: 'MTV News' },
    { source: 'financial-times', name: 'Financial Times' },
    { source: 'daily-mail', name: 'Daily Mail' }

  ];
  vm.test = test;
  function test() {
    vm.widget.url = `https://newsapi.org/v1/articles?source=${vm.newsWidget.source}&apiKey=902a003f156c4002995eb5a6c8267b0a`;
  }

}

// angular.module('app')
//
// .controller('DashboardCtrl', ['$scope', '$timeout',
// 	function($scope, $timeout) {
// 		$scope.gridsterOptions = {
// 			margins: [20, 20],
// 			columns: 4,
// 			draggable: {
// 				handle: 'h3'
// 			}
// 		};
//
// 		$scope.dashboards = {
// 			'1': {
// 				id: '1',
// 				name: 'Home',
// 				widgets: [{
// 					col: 0,
// 					row: 0,
// 					sizeY: 1,
// 					sizeX: 1,
// 					name: "Widget 1"
// 				}, {
// 					col: 2,
// 					row: 1,
// 					sizeY: 1,
// 					sizeX: 1,
// 					name: "Widget 2"
// 				}]
// 			},
// 			'2': {
// 				id: '2',
// 				name: 'Other',
// 				widgets: [{
// 					col: 1,
// 					row: 1,
// 					sizeY: 1,
// 					sizeX: 2,
// 					name: "Other Widget 1"
// 				}, {
// 					col: 1,
// 					row: 3,
// 					sizeY: 1,
// 					sizeX: 1,
// 					name: "Other Widget 2"
// 				}]
// 			}
// 		};
//
// 		$scope.clear = function() {
// 			$scope.dashboard.widgets = [];
// 		};
//
// 		$scope.addWidget = function() {
// 			$scope.dashboard.widgets.push({
// 				name: "New Widget",
// 				sizeX: 1,
// 				sizeY: 1
// 			});
// 		};
//
// 		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
// 			if (newVal !== oldVal) {
// 				$scope.dashboard = $scope.dashboards[newVal];
// 			} else {
// 				$scope.dashboard = $scope.dashboards[1];
// 			}
// 		});
//
// 		// init dashboard
// 		$scope.selectedDashboardId = '1';
//
// 	}
// ])
//
// .controller('CustomWidgetCtrl', ['$scope', '$modal',
// 	function($scope, $modal) {
//
// 		$scope.remove = function(widget) {
// 			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
// 		};
//
// 		$scope.openSettings = function(widget) {
// 			$modal.open({
// 				scope: $scope,
// 				templateUrl: 'demo/dashboard/widget_settings.html',
// 				controller: 'WidgetSettingsCtrl',
// 				resolve: {
// 					widget: function() {
// 						return widget;
// 					}
// 				}
// 			});
// 		};
//
// 	}
// ])
//
// .controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
// 	function($scope, $timeout, $rootScope, $modalInstance, widget) {
// 		$scope.widget = widget;
//
// 		$scope.form = {
// 			name: widget.name,
// 			sizeX: widget.sizeX,
// 			sizeY: widget.sizeY,
// 			col: widget.col,
// 			row: widget.row
// 		};
//
// 		$scope.sizeOptions = [{
// 			id: '1',
// 			name: '1'
// 		}, {
// 			id: '2',
// 			name: '2'
// 		}, {
// 			id: '3',
// 			name: '3'
// 		}, {
// 			id: '4',
// 			name: '4'
// 		}];
//
// 		$scope.dismiss = function() {
// 			$modalInstance.dismiss();
// 		};
//
// 		$scope.remove = function() {
// 			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
// 			$modalInstance.close();
// 		};
//
// 		$scope.submit = function() {
// 			angular.extend(widget, $scope.form);
//
// 			$modalInstance.close(widget);
// 		};
//
// 	}
// ])
//
// // helper code
// .filter('object2Array', function() {
// 	return function(input) {
// 		var out = [];
// 		for (i in input) {
// 			out.push(input[i]);
// 		}
// 		return out;
// 	}
// });
