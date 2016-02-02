'use strict';
namespace app.Services{
  export class UserService{


    constructor(
      private $routeParams: ng.route.IRouteParamsService
    ){
      }
  }
  angular.module('app').service('UserService', UserService)
}
