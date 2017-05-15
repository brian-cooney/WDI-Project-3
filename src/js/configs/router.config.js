angular
.module('wdi-group-project')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'users'
  })
  .state('widgetsIndex', {
    url: '/widgets',
    templateUrl: '/js/views/widgets/index.html',
    controller: 'WidgetsIndexCtrl',
    controllerAs: 'widgets'
  })
  .state('widgetsNew', {
    url: '/widgets/new',
    templateUrl: '/js/views/widgets/new.html',
    controller: 'WidgetsNewCtrl',
    controllerAs: 'widgets'
  });

  $urlRouterProvider.otherwise('/');
}
