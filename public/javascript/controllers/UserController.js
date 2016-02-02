'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserController = (function () {
            function UserController(UserService) {
                this.UserService = UserService;
            }
            return UserController;
        }());
        Controllers.UserController = UserController;
        angular.module('app').controller('UserController', UserController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
