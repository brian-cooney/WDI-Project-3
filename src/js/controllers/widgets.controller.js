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
    });
  }
  vm.delete = widgetsDelete;
  vm.nextGiphy = nextGiphy;
  function nextGiphy(item) {
    console.log(item.giphyIndex);
    if (item.giphyIndex+1 === item.data.data.length) {
      item.giphyIndex = 0;
    } else item.giphyIndex++;
  }
  vm.icons = [{
    type: 'sun',
    url: '/images/weather-icons/sun.png'
  }];

  function widgetsDelete(widget) {
    vm.all.splice(vm.all.indexOf(widget), 1);
    Widget.remove({ id: widget._id });
  }
}

WidgetsNewCtrl.$inject = ['$state', 'Widget', 'CurrentUserService'];
function WidgetsNewCtrl($state, Widget, CurrentUserService) {
  const vm = this;
  vm.create = widgetsCreate;
  vm.widget = {};
  vm.widget.data = {};
  vm.widget.giphyIndex = 0;
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
    { type: 'cat', name: 'Cat Gif' },
    { type: 'events', name: 'Events' },
    { type: 'chuck', name: 'Chuck Norris Jokes' },
    { type: 'recipes', name: 'Recipes' },
    { type: 'joke', name: 'Jokes' },
    { type: 'quote', name: 'Random Quote' },
    { type: 'trumpify', name: 'Trumpify' },
    { type: 'advice', name: 'Advice' },
    { type: 'today', name: 'This Day in History' }
  ];
  vm.onChange = onChange;
  function onChange(option) {
    console.log('changed', option);
    switch (option) {
      case 'cat': vm.widget.url = 'http://thecatapi.com/api/images/get?format=src&type=gif';
      vm.widget.sizeX = 2; vm.widget.sizeY = 2;
      break;
      case 'trumpify': vm.widget.url = 'https://api.whatdoestrumpthink.com/api/v1/quotes';
      break;
      case 'chuck': vm.widget.url = 'https://api.chucknorris.io/jokes/random';
      break;
      case 'advice': vm.widget.url = 'http://api.adviceslip.com/advice';
      break;
      case 'news': vm.widget.sizeX = 4; vm.widget.sizeY = 1;
      break;
      case 'giphy': vm.widget.sizeX = 2; vm.widget.sizeY = 2;
      break;
      case 'weather': vm.widget.sizeX = 1; vm.widget.sizeY = 1;
      break;
      default: break;
    }
  }
  vm.giphySearch = giphySearch;
  vm.giphySearchTerms = '';
  function giphySearch() {
    const search = vm.giphySearchTerms.split(' ').join('+');
    console.log(search);
    vm.widget.url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC`;
    console.log(vm.widget.url);
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
