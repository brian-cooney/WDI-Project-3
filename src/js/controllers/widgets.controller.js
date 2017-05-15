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
    vm.all = {};
    Widget
      .query({ 'user': vm.user })
      .$promise
      .then(widgets => {
        vm.all = widgets;
      });
  }
  vm.delete = widgetsDelete;
  function widgetsDelete(widget) {
    widget.deleted = true;
    Widget
    .remove({ id: widget._id });
  }
}

WidgetsNewCtrl.$inject = ['$state', 'Widget', 'CurrentUserService'];
function WidgetsNewCtrl($state, Widget, CurrentUserService) {
  const vm = this;
  vm.create = widgetsCreate;
  vm.widget = {};
  vm.widget.data = {};
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
}
