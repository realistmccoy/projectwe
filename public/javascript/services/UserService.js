'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($routeParams) {
                this.$routeParams = $routeParams;
            }
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('app').service('UserService', UserService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
