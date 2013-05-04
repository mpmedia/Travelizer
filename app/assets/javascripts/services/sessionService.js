angular.module('sessionService', [])
    .factory('Session', function($location, $http) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            login: function(email, password) {
                return $http.post('/login', {user: {email: email, password: password} })
                    .then(function(response) {
                        if(response.data.success) {
                            service.currentUser = response.data.user;
                            if (service.isAuthenticated()) {
                                //$location.path(response.data.redirect);
                            }
                        }
                });
            },

            logout: function(redirectTo) {
                $http.post('/logout').then(function() {
                    service.currentUser = null;
                    redirect(redirectTo);
                });
            },

            requestCurrentUser: function() {
                if (service.isAuthenticated()) {
                    return $q.when(service.currentUser);
                } else {
                    return $http.get('/current_user').then(function(response) {
                        service.currentUser = response.data.user;
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
    });
