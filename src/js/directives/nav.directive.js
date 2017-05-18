angular
  .module('wdi-group-project')
  .directive('navDirective', navDirective);


navDirective.$inject = [];
function navDirective() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '/js/views/nav.html';

  return directive;
}
