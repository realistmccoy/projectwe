'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.info = {};
            }
            HomeController.prototype.createInfo = function () {
                var _this = this;
                this.HomeService.saveInfo(this.info).then(function (res) {
                    _this.$location.path('/');
                });
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
