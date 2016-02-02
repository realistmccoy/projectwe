<<<<<<< HEAD
"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService() {
            }
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
=======
"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.infoResource = $resource('/info/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.infoResource.query();
            };
            HomeService.prototype.getInfo = function (infoId) {
                return this.infoResource.get({ id: infoId });
            };
            HomeService.prototype.saveInfo = function (info) {
                return this.infoResource.save(info).$promise;
            };
            HomeService.prototype.updateInfo = function (info) {
                return this.infoResource.update({ id: info._id }, info).$promise;
            };
            HomeService.prototype.deleteInfo = function (infoId) {
                return this.infoResource.delete({ _id: infoId }).$promise;
            };
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
>>>>>>> 94774f94bcfce18afc99f9444c14b9869b354d91
