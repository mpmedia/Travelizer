angular.module('securityService', [])
    .factory('TokenHandler', function() {
        var tokenHandler = {};
        var token = "none";

        tokenHandler.set = function(newToken) {
            token = newToken;
        };

        tokenHandler.get = function() {
            return token;
        };

        // wrap given actions of a resource to send auth token with every
        // request
        tokenHandler.wrapActions = function(resource, actions) {
            // copy original resource
            var wrappedResource = resource;
            for (var i=0; i < actions.length; i++) {
                tokenWrapper(wrappedResource, actions[i]);
            };
            // return modified copy of resource
            return wrappedResource;
        };

        // wraps resource action to send request with auth token
        var tokenWrapper = function(resource, action) {
            // copy original action
            resource['_' + action]  = resource[action];
            // create new action wrapping the original and sending token
            resource[action] = function(data, success, error){
                return resource['_' + action](
                    angular.extend({}, data || {}, {auth_token: tokenHandler.get()}),
                    success,
                    error
                );
            };
        };

        return tokenHandler;
    })
    .factory('Security', ['$location','$http','TokenHandler', function($location, $http, tokenHandler) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }
    var service = {
        login: function(email, password) {
            var request = $http.post('/login', {user: {email: email, password: password} });
            return request.then(function(response) {
                tokenHandler.set(response.data.auth_token);
                service.currentUser = response.data.user;
                if (service.isAuthenticated()) {
                    $location.path(response.data.redirect);
                }
            });
        },

        register: function(email, password, confirm_password) {
            var request = $http.post('/login', {user: {email: email, password: password, confirm_password: confirm_password} });
            return request.then(function(response) {
                tokenHandler.set(response.data.auth_token);
                service.currentUser = response.data.user;
                if (service.isAuthenticated()) {
                    //Go back to where you were
                }
            });
        },

        logout: function(redirectTo) {
            $http.post('/logout').then(function() {
                service.currentUser = null;
                tokenHandler.set('none');
                redirect(redirectTo);
            });
        },

        requestCurrentUser: function() {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                return $http.get('/current_user').then(function(response) {
                    service.currentUser = response.data.user;
                    tokenHandler.set(response.data.auth_token);
                    return service.currentUser;
                });
            }
        },

        currentUser: null,

        isAuthenticated: function(){
            return !!service.currentUser;
        }
    };
    return service;
    }]);
