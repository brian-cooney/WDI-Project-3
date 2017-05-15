angular
.module('wdi-group-project')
.factory('Widget', Widget);

Widget.$inject = ['API', '$resource'];
function Widget(API, $resource) {
  return $resource(`${API}/widgets/:id`,
    { id: '@_id'},
    { 'update': { method: 'PUT' }
    });
}
