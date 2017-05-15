angular
.module('wdi-group-project')
.controller('WidgetsIndexCtrl', WidgetsIndexCtrl)
.controller('WidgetsNewCtrl', WidgetsNewCtrl);

WidgetsIndexCtrl.$inject = ['Widget'];
function WidgetsIndexCtrl(Widget) {
  const vm = this;
  vm.all = Widget.query();
}

WidgetsNewCtrl.$inject = ['$state', 'Widget', '$rootScope', 'CurrentUserService'];
function WidgetsNewCtrl($state, Widget, $rootScope, CurrentUserService) {
  const vm = this;
  vm.create = widgetsCreate;
  vm.widget = {};
  $rootScope.$on('loggedIn', () => {
    vm.widget.user = CurrentUserService.currentUser._id;
  });
  function widgetsCreate() {
    Widget
      .save(vm.widget)
      .$promise
      .then(() => {
        console.log(vm.widget);
        $state.go('widgetsIndex');
      });
  }
}
