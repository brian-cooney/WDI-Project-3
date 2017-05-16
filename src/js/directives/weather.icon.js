angular
  .module('wdi-group-project')
  .directive('weather-icon', weatherIcon);

weatherIcon.$inject = [];
function weatherIcon() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '/js/views/templates/weathericon.html';
  directive.scope = {
    type: '@'
  };
  return directive;
}
