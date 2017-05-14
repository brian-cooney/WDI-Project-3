angular
  .module('wdi-group-project')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User', '$rootScope' ];
function CurrentUserService(TokenService, User, $rootScope) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (decoded) {
      console.log(decoded);
      User
        .get({ id: decoded.id }).$promise
        .then(data => {
          console.log(data);
          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
