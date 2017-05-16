angular
  .module('wdi-group-project')
  .directive('giphy', giphy);

giphy.$inject = ['$window'];
function giphy($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div><img src="http://fillmurray.com/200/200"><p>Giphy image here.</p></div>'
  };
}
