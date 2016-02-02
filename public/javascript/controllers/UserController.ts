'use strict';
namespace app.Controllers{
  export class UserController{
    public user;

    public register(){
      let user = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      }
      this.UserService.register(user).then((res) =>{
        this.$location.path('/login')
      })
    }

    public login(user){
      this.UserService.login(user).then((res) => {
        this.UserService.setToken(res.token);
        this.UserService.setUser();
        this.$location.path('/');
      });
    };

    constructor(
      private UserService: app.Services.UserService,
      private $location: ng.ILocationService
    ){}
  }
  angular.module('app').controller('UserController', UserController)
}
