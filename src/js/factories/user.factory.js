angular
  .module('wdi-group-project')
  .factory('User', User);

User.$inject = ['API', '$resource'];
function User(API, $resource){
  return $resource(`${API}/users/:id`, { id: '@_id'}, {
    register: { method: 'POST', url: `${API}/register` },
    login:    { method: 'POST', url: `${API}/login` }
  });
}
