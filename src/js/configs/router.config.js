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
  .state('oops', {
    url: '/oops',
    templateUrl: '/js/views/oops.html'
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
  .state('widgetsIndex', {
    url: '/dashboard',
    templateUrl: '/js/views/widgets/index.html',
    controller: 'WidgetsIndexCtrl',
    controllerAs: 'widgets'
  });

  $urlRouterProvider.otherwise('/oops');
}
