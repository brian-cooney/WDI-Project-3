angular
  .module('wdi-group-project')
  .filter('htmlToPlaintext', Filter);

function Filter() {
  return function(text) {
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
}
