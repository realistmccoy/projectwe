'use strict';
namespace app.Controllers{
  export class UserController{
    public user;

    constructor(
      private UserService: app.Services.UserService
    ){}
  }
  angular.module('app').controller('UserController', UserController)
}
