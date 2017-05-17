angular
  .module('wdi-group-project')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = login;
  function login() {
    User
      .login(vm.user).$promise
      .then(data => {
        console.log(data);
        CurrentUserService.getUser();
        $state.go('widgetsIndex');
      }, err => {
        console.log(err);
      });
  }
}
