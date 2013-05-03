function UsersCtrl($scope, Security) {"use strict";
    $scope.login = function(user) {
        $scope.authError = null;

        Security.login(user.email, user.password)
        .then(function(loggedIn) {
            if (!loggedIn) {
                $scope.authError = 'Credentials are not valid';
            }
        }, function(x) {
            $scope.authError = 'Login Server offline, please try later';
        });
    };

    $scope.register = function(user) {
        $scope.authError = null;

        Security.register(user.email, user.password, user.confirm_password)
            .then(function(loggedIn) {
                if (!loggedIn) {
                    $scope.authError = 'Credentials are not valid';
                }
            }, function(x) {
                $scope.authError = 'Login Server offline, please try later';
            });
    };
}

