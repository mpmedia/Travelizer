function UsersCtrl($scope, Session) {"use strict";
    $scope.login = function(user) {
        $scope.authError = null;

        Session.login(user.email, user.password)
        .then(function(loggedIn) {
            if (!loggedIn) {
                $scope.authError = 'Credentials are not valid';
            } else {
                $scope.authError = 'Success!';
            }
        }, function(x) {
            $scope.authError = 'Login Server offline, please try later';
        });
    };
}

