angular
.module('wdi-group-project')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;
  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    // console.log('USER: ', vm.user.username)
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('home');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

  vm.dark = false;
  vm.darkTheme = darkTheme;
  function darkTheme() {
    if (vm.dark === false) {
      vm.dark = true;
    } else {
      vm.dark =false;
    }
    console.log(vm.dark);
  }

}
