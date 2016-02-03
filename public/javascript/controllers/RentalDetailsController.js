'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var RentalDetailsController = (function () {
            function RentalDetailsController(HomeService, $routeParams) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.rental = HomeService.getInfo($routeParams['id']);
            }
            return RentalDetailsController;
        }());
        Controllers.RentalDetailsController = RentalDetailsController;
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
