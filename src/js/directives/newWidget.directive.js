angular
  .module('wdi-group-project')
  .directive('newWidgets', newWidgets);


newWidgets.$inject = [];
function newWidgets() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '/js/views/widgets/new.html';

  return directive;
}
