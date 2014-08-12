;(function () {

/**
 * Convenience functions for use on client.
 *
 * NOTE: You must restrict user actions on the server-side; any
 * client-side checks are strictly for convenience and must not be
 * trusted.
 *
 * @module Helpers
 */

////////////////////////////////////////////////////////////
// UI helpers
//
// Use a semi-private variable rather than declaring UI
// helpers directly so that we can unit test the helpers.
// XXX For some reason, the UI helpers are not registered 
// before the tests run.
//
Roles._handlebarsHelpers = {

  /**
   * UI helper to check if current user is in at least one
   * of the target roles.  For use in client-side templates.
   *
   * @method isInRole
   * @param {String} role name of role or comma-seperated list of roles
   * @param {String} scope identifier of role scope to check
   * @return {Boolean} true if current user is in at least one of the target roles
   */
  isInRole: function (role, scope) {
    var user = Meteor.user(),
      scopes, roles

    if (!user) return false

	roles = commaSplit(role);
	scopes = commaSplit(scope);

    return Roles.userIsInRole(user, roles, scopes)
  }
}

// comma splitter
var commaSplit = function(str) {
	if(typeof str !== "string")	return;
	
	var comma = str && str.indexOf(','),
		splitStr
		
    if (comma !== -1) {
      splitStr = _.reduce(str.split(','), function (memo, r) {
        if (!r || !r.trim()) {
          return memo
        }
        memo.push(r.trim())
        return memo
      }, [])
    } else {
      splitStr = [str]
    }
	return splitStr;
}

if ('undefined' !== typeof UI) {
  _.each(Roles._handlebarsHelpers, function (func, name) {
    UI.registerHelper(name, func)
  })
} else {
  console.log('WARNING: Roles UI helpers not registered. UI not defined')
}

}());
